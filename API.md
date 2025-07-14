# OrbitMarketAI API 명세서 (Swagger 기준)

---

이 문서는 프로젝트에 구현된 Swagger(OpenAPI) 명세를 기준으로 작성되었습니다.

## **인증 (Auth)**

---

### `POST /api/auth/login`

**Operation ID**: `AuthController_login`
**요약**: 사용자 로그인

#### Request

**Body**: `application/json`

-   **Schema**: `LoginDto`

| 이름       | 타입     | 필수 | 설명           | 예시            |
| :--------- | :------- | :--- | :------------- | :-------------- |
| `email`    | `string` | Yes  | 사용자 이메일  | `test@example.com` |
| `password` | `string` | Yes  | 사용자 비밀번호| `password123`   |

#### Responses

-   **`201 Created`**

    -   **Content**: `application/json`
    -   **Schema**:

    ```json
    {
      "access_token": "string"
    }
    ```

---

## **사용자 (Users)**

---

### `GET /api/users/me`

**Operation ID**: `UsersController_getProfile`
**요약**: 내 정보 조회
**Security**: `Bearer Token` 필요

#### Responses

-   **`200 OK`**

    -   **Content**: `application/json`
    -   **Schema**:

    ```json
    {
      "userId": "number",
      "email": "string",
      "role": "string"
    }
    ```
-   **`401 Unauthorized`**: 인증 실패 또는 토큰이 없는 경우

---

## **마케팅 (Marketing)**

---

### `GET /api/marketing/products`

**Operation ID**: `MarketingController_getProducts`
**요약**: 마케팅용 상품 리스트 조회
**설명**: 홍보 가능한 상품 리스트를 반환합니다.

#### Parameters

| 이름       | 위치    | 타입     | 필수 | 설명         |
| :--------- | :------ | :------- | :--- | :----------- |
| `search`   | `query` | `string` | No   | 상품명 검색  |
| `category` | `query` | `string` | No   | 카테고리 필터|
| `sort`     | `query` | `string` | No   | 정렬 기준    |

#### Responses

-   **`200 OK`**

    -   **Content**: `application/json`
    -   **Schema**: `Array<ProductListItemDto>`
    -   **`ProductListItemDto` Schema**:

    | 이름            | 타입           | 설명                   |
    | :-------------- | :------------- | :--------------------- |
    | `id`            | `number`       | 상품 고유 ID           |
    | `name`          | `string`       | 상품명                 |
    | `category`      | `string` `null`| 카테고리               |
    | `reward`        | `number` `null`| 홍보 리워드 (원)       |
    | `rewardRate`    | `number` `null`| 리워드 지급률 (%)      |
    | `promoterCount` | `number`       | 현재 상품을 홍보중인 인원 수 |
    | `imageUrl`      | `string` `null`| 상품 대표 이미지 URL   |

---

### `GET /api/marketing/products/{productId}`

**Operation ID**: `MarketingController_getProductById`
**요약**: 상품 상세 정보 조회
**설명**: 상품의 상세 정보를 반환합니다.

#### Parameters

| 이름        | 위치   | 타입      | 필수 | 설명         |
| :---------- | :----- | :-------- | :--- | :----------- |
| `productId` | `path` | `integer` | Yes  | 상품 고유 ID |

#### Responses

-   **`200 OK`**

    -   **Content**: `application/json`
    -   **Schema**: `ProductDetailDto`
    -   **`ProductDetailDto` Schema**:

    | 이름          | 타입           | 설명               |
    | :------------ | :------------- | :----------------- |
    | `id`          | `number`       | 상품 고유 ID       |
    | `name`        | `string`       | 상품명             |
    | `description` | `string` `null`| 상품 상세 설명     |
    | `price`       | `number` `null`| 상품 가격 (원)     |
    | `reward`      | `number` `null`| 홍보 리워드 (원)   |
    | `rewardRate`  | `number` `null`| 리워드 지급률 (%)  |
    | `sellerName`  | `string` `null`| 판매자 이름        |
    | `imageUrl`    | `string` `null`| 상품 대표 이미지 URL |
    | `category`    | `string` `null`| 카테고리           |

-   **`404 Not Found`**: 해당 ID의 상품이 없는 경우

---

### `POST /api/marketing/promote`

**Operation ID**: `MarketingController_promote`
**요약**: 홍보 시작 (트래킹 링크 발급)
**설명**: 선택한 상품에 대한 트래킹 링크를 생성하여 반환합니다.
**Security**: `Bearer Token` 필요

#### Request

**Body**: `application/json`

-   **Schema**: `PromoteDto`

| 이름        | 타입      | 필수 | 설명                     |
| :---------- | :-------- | :--- | :----------------------- |
| `productId` | `integer` | Yes  | 홍보를 시작할 상품의 고유 ID |

#### Responses

-   **`201 Created`**
    -   **Content**: `application/json`
    -   **Schema**: `TrackingUrlDto`

    | 이름          | 타입     | 설명                 |
    | :------------ | :------- | :------------------- |
    | `trackingUrl` | `string` | 생성된 고유 트래킹 URL |

-   **`401 Unauthorized`**: 인증 실패 또는 토큰이 없는 경우

---

### `POST /api/marketing/track-event`

**Operation ID**: `MarketingController_trackEvent`
**요약**: 트래킹 이벤트 수집
**설명**: 구매, 영상완료 등 추가적인 사용자 행동 이벤트를 기록합니다.

#### Request

**Body**: `application/json`

-   **Schema**: `TrackEventDto`

| 이름         | 타입          | 필수 | 설명                                   |
| :----------- | :------------ | :--- | :------------------------------------- |
| `trackingId` | `string`      | Yes  | 트래킹 ID                              |
| `eventType`  | `string`      | Yes  | 이벤트 타입 (`click`, `purchase`, `video_complete`) |
| `userInfo`   | `UserInfoDto` | Yes  | 사용자 정보                            |
| `extra`      | `object`      | No   | 기타 추가 정보 (JSON)                  |

-   **`UserInfoDto` Schema**:

| 이름        | 타입     | 설명               |
| :---------- | :------- | :----------------- |
| `ip`        | `string` | IP 주소            |
| `userAgent` | `string` | 브라우저 User Agent|
| `referer`   | `string` | 유입 경로          |

#### Responses

-   **`201 Created`**
    -   **Content**: `application/json`
    -   **Schema**: `{ "success": "boolean" }`

---

### `GET /api/marketing/stats`

**Operation ID**: `MarketingController_getStats`
**요약**: 홍보 실적/통계 조회
**설명**: 로그인한 사용자의 홍보 실적(클릭, 구매, 예상 리워드)을 조회합니다.
**Security**: `Bearer Token` 필요

#### Responses

-   **`200 OK`**

    -   **Content**: `application/json`
    -   **Schema**: `Array<StatsDto>`
    -   **`StatsDto` Schema**:

    | 이름             | 타입     | 설명               |
    | :--------------- | :------- | :----------------- |
    | `productId`      | `number` | 상품 고유 ID       |
    | `productName`    | `string` | 상품명             |
    | `clicks`         | `number` | 총 클릭 수         |
    | `purchases`      | `number` | 총 구매 전환 수    |
    | `expectedReward` | `number` | 예상 리워드 (원)   |

-   **`401 Unauthorized`**: 인증 실패 또는 토큰이 없는 경우

---

## **트래킹 (Tracking)**

---

### `GET /t/{trackingId}`

**참고**: 이 API는 Swagger UI에서 제외되어 있습니다 (`@ApiExcludeController`). JSON을 반환하는 대신 `302 Found` 상태 코드로 페이지를 리디렉션합니다.

**설명**: 생성된 트래킹 링크로 접근 시, 클릭 이벤트를 기록하고 원래 상품 페이지로 리디렉션합니다.

#### Parameters

| 이름         | 위치   | 타입     | 필수 | 설명               |
| :----------- | :----- | :------- | :--- | :----------------- |
| `trackingId` | `path` | `string` | Yes  | 발급된 고유 트래킹 ID |

#### Responses

-   **`302 Found`**: 상품 페이지로 리디렉션
-   **`404 Not Found`**: 해당 트래킹 ID가 존재하지 않는 경우 