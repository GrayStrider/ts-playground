import * as fs from 'fs'

const dir = 'C:\\tools\\bash test\\'

/**
 * remove extra _s if any
 */
const regex = /^(?:_+)?(.*?)(?:_+)?$/gi

const renameFile = (file) => {
  const [, name, extension] = file.match(/(.*)(\..*)/)
  fs.rename(
    dir + file,
    dir + name.replace(regex, '_$1_') + extension,
    (err => console.log(err)))
}

fs.readdirSync(dir)
  .forEach(file => {
      try {
        renameFile(file)
      } catch (e) {
        console.log(e)
      }
    }
  )

