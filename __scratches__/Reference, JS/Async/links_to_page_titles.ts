import axios, { AxiosResponse } from 'axios'

const source = '[https://dev.to/mattdionis/never-too-late-to-learn-my-meandering-path-to-a-career-in-software-engineering-1p97](https://dev.to/mattdionis/never-too-late-to-learn-my-meandering-path-to-a-career-in-software-engineering-1p97)\n' +
  '[A CEO\'s #1 Tip On How Stand Out As A New Full-Stack Developer in A Competitive Market ⚡ - DEV Community 👩💻👨💻 ](https://dev.to/skill_pathway/a-ceo-s-1-tip-on-how-stand-out-as-a-new-full-stack-developer-in-a-competitive-market-6h2?utm_source=digest_mailer&utm_medium=email&utm_campaign=digest_email)\n' +
  '[How to make your tech LinkedIn profile rock - DEV Community 👩💻👨💻 ](https://dev.to/stetsenko_me/how-to-make-your-tech-linkedin-profile-rock-54ge?utm_source=digest_mailer&utm_medium=email&utm_campaign=digest_email)\n' +
  '[Job Search Resources and Tips - DEV Community 👩💻👨💻 ](https://dev.to/kcarrel/job-search-resources-and-tips-50od?utm_source=digest_mailer&utm_medium=email&utm_campaign=digest_email)\n' +
  '[Douglas Makey Mendez Molero - DEV Community 👩💻👨💻 ](https://dev.to/douglasmakey)\n' +
  'https://usefyi.com/remote-work-report/\n' +
  '[https://dev.to/websmyth/are-you-sure-you-want-to-go-freelance-2pli](https://dev.to/websmyth/are-you-sure-you-want-to-go-freelance-2pli)\n' +
  'hackajob\n' +
  'A lead/senior front-end developer/engineer can potentially live wherever they want (i.e., work remotely) and make over $150k a year (visit [angel.co](https://angel.co/jobs), sign-up, review front-end jobs over $150k or examine the salary ranges on [Stack Overflow Jobs](https://stackoverflow.com/jobs?q=front-end&sort=y)).\n' +
  'https://github.com/jessicard/remote-jobs\n' +
  '[authenticjobs.com](https://authenticjobs.com/#category=4)\n' +
  '[careers.stackoverflow.com](http://careers.stackoverflow.com/jobs?searchTerm=front-end)\n' +
  '[css-tricks.com/jobs](https://css-tricks.com/jobs/)\n'

let urls = <string[]>source.match(
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi)
urls = [...new Set(urls)]

const titleR = new RegExp(/(?<=<title>)(.+)(?=<\/title>)/)

const extractTitle = (response: AxiosResponse) =>
  response.data.match(titleR)[0]

const fetchTitles = async (urls: string[]) => {
  const total = urls.length
  let left = urls.length
  const promises = urls.map(url =>
    axios.get(url)
         .then(response => {
             console.log(`[${left}/${total}]`)
             return extractTitle(response)
           }
         ).catch(e => left--))
  return Promise.all(promises)
}

fetchTitles(urls).then(titles => console.log(titles))
