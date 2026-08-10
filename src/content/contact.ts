export interface ContactInfo {
  /** TODO(user): the email you want recruiters to use. */
  email: string
  /** TODO(user): optional — common on Japanese resumes; leave empty to hide. */
  phone: string
  /** TODO(user): "City, Country". */
  location: string
  links: {
    /** TODO(user): full GitHub profile URL. */
    github: string
    /** TODO(user): full LinkedIn profile URL. */
    linkedin: string
    /** TODO(user): personal site, if any. */
    website: string
  }
  /** TODO(user): link to a hosted PDF resume/CV. Leave empty to hide the download link. */
  resumeUrl: string
}

// NOTE(user): every field below is intentionally blank — fill in your own
// details.
export const contact: ContactInfo = {
  email: '',
  phone: '',
  location: '',
  links: { github: '', linkedin: '', website: '' },
  resumeUrl: '',
}
