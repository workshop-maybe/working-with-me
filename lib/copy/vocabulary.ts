/**
 * Single source of user-facing nouns for this product.
 *
 * Every UI surface should import strings from `COPY` rather than hard-coding
 * labels, so the vocabulary stays consistent and reviewable in one place.
 *
 * FORBIDDEN Andamio-internal terms that must never appear in user-facing copy:
 *   - course
 *   - module
 *   - SLT
 *   - student
 *   - teacher
 *   - assignment submission
 *   - credential issuance
 */
export const COPY = Object.freeze({
  assignment: 'Assignment',
  assignments: 'Assignments',
  commitment: 'Commitment',
  commitments: 'Commitments',
  connection: 'Connection',
  connections: 'Connections',
  credential: 'Credential',
  credentials: 'Credentials',
  yourSpace: 'your space',
  moreAboutHowIWork: 'more about how I work',
} as const);

export type Copy = typeof COPY;
