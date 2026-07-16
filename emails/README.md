# Transactional email templates

Standalone HTML email templates for Prime Edge Admin, separate from the Next.js app
(table-based layout with inlined styles for email client compatibility).

- `admin-invitation.html` — production template with `{{token}}` placeholders for the
  backend/email service to fill in (`{{recipient_first_name}}`, `{{portal_url}}`,
  `{{admin_email}}`, `{{temporary_signin_code}}`, `{{logo_url}}`, etc.). Image `{{...url}}`
  tokens must resolve to publicly hosted URLs — email clients cannot load local/relative paths.
- `preview.html` — same template with sample data and local `assets/` images wired in, for
  visual QA in a browser. Not meant to be sent.
- `assets/` — logo and social icons exported from Figma, for use as the hosted image sources
  referenced by the `{{...url}}` tokens above.
