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

// NOTE(user): sample copy so you can preview the layout — swap for your own
// (same convention as projects.ts). `github` already points at this repo's
// real handle since that's public info; email/linkedin/phone/resume are
// placeholders — replace them with your real ones.
export const contact: ContactInfo = {
  email: 'monster722006@gmail.com',
  phone: '+84 336 874 730',
  location: 'Da Nang, Vietnam',
  links: {
    github: 'https://github.com/monster9k',
    linkedin: 'https://www.linkedin.com/in/nguy%E1%BB%85n-vi%E1%BA%BFt-minh-khoa-undefined-228158384/',
    website: '',
  },
  resumeUrl: '',
}
