/**
 * Minimal request/response shapes for the 11 allowlisted Andamio v2 endpoints.
 *
 * This file is committed (not gitignored) and is also produced by
 * `pnpm generate:types`, which calls swagger-typescript-api against
 * `${ANDAMIO_GATEWAY_URL}/api/v2/docs/doc.json` when the doc is reachable.
 * When the doc is unreachable, the script falls through to
 * `scripts/fallback-types.mjs` and this hand-written file remains in place.
 *
 * Shapes are intentionally permissive (`[k: string]: unknown`) where the v2
 * spec is not yet pinned, so downstream children can tighten fields as they
 * actually call the endpoints.
 */

export interface LoginSessionRequest {
  walletAddress: string;
  [k: string]: unknown;
}

export interface LoginSessionResponse {
  nonce: string;
  [k: string]: unknown;
}

export interface LoginValidateRequest {
  walletAddress: string;
  signature: string;
  [k: string]: unknown;
}

export interface LoginValidateResponse {
  jwt: string;
  [k: string]: unknown;
}

export interface CourseCreateRequest {
  body?: unknown;
  [k: string]: unknown;
}

export interface CourseCreateResponse {
  id: string;
  courseId?: string;
  [k: string]: unknown;
}

export interface CoursesListResponse {
  courses: ReadonlyArray<{
    id: string;
    courseId?: string;
    [k: string]: unknown;
  }>;
  [k: string]: unknown;
}

export interface CourseDetailResponse {
  id: string;
  courseId?: string;
  body?: unknown;
  gatedBody?: unknown;
  [k: string]: unknown;
}

export interface CourseUpdateRequest {
  courseId: string;
  body?: unknown;
  gatedBody?: unknown;
  [k: string]: unknown;
}

export interface CourseUpdateResponse {
  id: string;
  courseId?: string;
  [k: string]: unknown;
}

export interface StudentRegisterRequest {
  courseId: string;
  walletAddress: string;
  [k: string]: unknown;
}

export interface StudentRegisterResponse {
  id: string;
  [k: string]: unknown;
}

export interface ApproveStudentRequest {
  courseId: string;
  walletAddress: string;
  [k: string]: unknown;
}

export interface ApproveStudentResponse {
  id: string;
  [k: string]: unknown;
}

export interface CredentialIssueRequest {
  courseId: string;
  walletAddress: string;
  [k: string]: unknown;
}

export interface CredentialIssueResponse {
  id: string;
  txHash?: string;
  [k: string]: unknown;
}

export interface TeacherPendingResponse {
  pending: ReadonlyArray<{
    id: string;
    walletAddress: string;
    [k: string]: unknown;
  }>;
  [k: string]: unknown;
}

export interface StudentCredentialsResponse {
  credentials: ReadonlyArray<{
    id: string;
    courseId?: string;
    ownerAddress?: string;
    [k: string]: unknown;
  }>;
  [k: string]: unknown;
}
