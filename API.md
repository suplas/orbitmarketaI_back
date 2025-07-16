# OrbitMarketAI 백엔드 API 명세서

이 문서는 OrbitMarketAI 백엔드 서버의 API를 설명합니다. 모든 요청과 응답의 본문은 JSON 형식이며, 서버 기본 URL은 `http://localhost:3500` 입니다.

---

## 목차

1.  [인증 (Authentication)](#1-인증-authentication)
2.  [사용자 (Users)](#2-사용자-users)
3.  [마케팅 (Marketing)](#3-마케팅-marketing)
4.  [트래킹 (Tracking)](#4-트래킹-tracking)

---

## 1. 인증 (Authentication)

### 1.1 `POST /auth/login`

로컬 계정(이메일, 비밀번호)을 사용하여 로그인하고 JWT 액세스 토큰을 발급받습니다.

-   **요청 본문 (Request Body):**

    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

    | 필드       | 타입     | 설명           | 필수 |
    | ---------- | -------- | -------------- | ---- |
    | `email`    | `string` | 사용자 이메일  | O    |
    | `password` | `string` | 사용자 비밀번호| O    |

-   **응답 (Response): `200 OK`**

    ```json
    {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "홍길동"
      }
    }
    ```

### 1.2 소셜 로그인 (Google, Kakao)

-   `GET /auth/google`
-   `GET /auth/kakao`

각 소셜 플랫폼의 로그인 페이지로 사용자를 리디렉션합니다. 브라우저에서 직접 호출해야 합니다.

-   **흐름:**
    1.  사용자가 프론트엔드에서 "Google/Kakao로 로그인" 버튼 클릭
    2.  프론트엔드는 `http://localhost:3500/api/auth/google` 과 같은 백엔드 엔드포인트로 리디렉션
    3.  백엔드는 사용자를 실제 소셜 플랫폼 로그인 페이지로 리디렉션
    4.  로그인 성공 시, 소셜 플랫폼은 아래의 콜백 URL로 사용자를 리디렉션

### 1.3 소셜 로그인 콜백

-   `GET /auth/google/callback`
-   `GET /auth/kakao/callback`

소셜 플랫폼에서 로그인이 성공적으로 완료된 후 호출되는 콜백 엔드포인트입니다. 성공 시 로컬 계정과 동일한 형식의 JWT 액세스 토큰을 반환합니다.

-   **응답 (Response): `200 OK`**
    - `POST /auth/login` 과 동일한 형식의 응답을 반환합니다.

---

## 2. 사용자 (Users)

### 2.1 `GET /users/me`

현재 로그인된 사용자의 정보를 조회합니다.

-   **인증:** `Bearer Token` 필요
-   **응답 (Response): `200 OK`**

    ```json
    {
      "userId": 1,
      "email": "user@example.com",
      "role": "promoter"
    }
    ```
    *참고: 위 응답은 JWT 페이로드에 포함된 정보이며, 실제 응답은 `users` 테이블의 더 상세한 정보를 포함할 수 있습니다.*


---

## 3. 마케팅 (Marketing)

### 3.1 `GET /marketing/products`

홍보 가능한 전체 상품 목록을 조회합니다.

-   **쿼리 파라미터 (Query Parameters):**

    | 필드       | 타입     | 설명             | 필수 |
    | ---------- | -------- | ---------------- | ---- |
    | `search`   | `string` | 상품명으로 검색  | X    |
    | `category` | `string` | 카테고리로 필터링| X    |
    | `sort`     | `string` | 정렬 기준        | X    |

-   **응답 (Response): `200 OK`**

    ```json
    [
      {
        "id": 1,
        "name": "친환경 텀블러",
        "category": "생활용품",
        "reward": 5000,
        "rewardRate": 20,
        "promoterCount": 128,
        "imageUrl": "https://.../image.jpg"
      }
    ]
    ```

### 3.2 `GET /marketing/products/:productId`

특정 상품의 상세 정보를 조회합니다.

-   **경로 파라미터 (Path Parameters):**

    | 필드        | 타입     | 설명        |
    | ----------- | -------- | ----------- |
    | `productId` | `number` | 상품 고유 ID|

-   **응답 (Response): `200 OK`**

    ```json
    {
      "id": 1,
      "name": "친환경 텀블러",
      "description": "지구를 생각하는...",
      "price": 25000,
      "reward": 5000,
      "rewardRate": 20,
      "sellerName": "EcoLife",
      "imageUrl": "https://.../image.jpg",
      "category": "생활용품"
    }
    ```

### 3.3 `POST /marketing/promote`

특정 상품에 대한 홍보를 시작하고, 고유 트래킹 링크를 발급받습니다.

-   **인증:** `Bearer Token` 필요
-   **요청 본문 (Request Body):**

    ```json
    {
      "productId": 1
    }
    ```
-   **응답 (Response): `201 Created`**

    ```json
    {
      "trackingUrl": "http://localhost:3500/t/8f3e9c1d-c3b0-4b3a-8e1e-2b0a1b3c4d5e"
    }
    ```

### 3.4 `POST /marketing/track-event`

클릭 외에 구매, 영상 시청 완료 등 추가적인 이벤트를 서버에 기록합니다.

-   **요청 본문 (Request Body):**

    ```json
    {
      "trackingId": "8f3e9c1d-c3b0-4b3a-8e1e-2b0a1b3c4d5e",
      "eventType": "purchase",
      "userInfo": {
        "ip": "1.2.3.4",
        "userAgent": "Mozilla/5.0 ...",
        "referer": "https://blog.naver.com/..."
      },
      "extra": {
        "orderId": "ORD12345",
        "amount": 25000
      }
    }
    ```
-   **응답 (Response): `201 Created`**

    ```json
    {
      "success": true
    }
    ```

### 3.5 `GET /marketing/stats`

로그인한 사용자의 홍보 실적 및 통계를 조회합니다.

-   **인증:** `Bearer Token` 필요
-   **응답 (Response): `200 OK`**

    ```json
    [
      {
        "productId": 1,
        "productName": "친환경 텀블러",
        "clicks": 120,
        "purchases": 5,
        "expectedReward": 25000
      }
    ]
    ```

---

## 4. 트래킹 (Tracking)

### 4.1 `GET /t/:trackingId`

홍보자가 공유한 트래킹 링크로 소비자가 접속했을 때 호출되는 엔드포인트입니다.

-   **설명:**
    이 엔드포인트는 JSON을 반환하는 일반적인 API가 아닙니다. 호출 시 서버는 다음 두 가지 동작을 수행합니다.
    1.  요청 정보를 바탕으로 `promotion_events` 테이블에 `click` 이벤트를 기록합니다.
    2.  사용자를 해당 상품의 실제 판매 페이지(외부 쇼핑몰 등)로 302 리디렉션 시킵니다.
-   **경로 파라미터 (Path Parameters):**

    | 필드         | 타입     | 설명                               |
    | ------------ | -------- | ---------------------------------- |
    | `trackingId` | `string` | `/marketing/promote`로 발급받은 ID |

-   **응답 (Response): `302 Found`**
    -   `Location` 헤더에 리디렉션될 최종 URL이 포함됩니다. 