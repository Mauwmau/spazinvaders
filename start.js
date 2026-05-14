import { createServer, } from "node:http";
import fs from "node:fs"

const contentTypings = {
  html: 'text/html',
  js: 'application/javascript'
}

const server = createServer();

server.on('request', (request, response) => {
  const path = request.url.slice(1)
  const [filename, fileExtension] = path.split(".")
  
  if (!contentTypings[fileExtension]) {
    console.log('Bad content type : ' + fileExtension)
    response.end()
    return
  }

  let data = "Hello World!"
  try {
    data = fs.readFileSync(`./public/${path}`, 'utf8')  
  } catch (error) {
    throw error
  }

  response.setHeader("content-type", contentTypings[fileExtension] || "text/html")
  response.setHeader("content-encoding", "utf8")
  response.end(data)
})

server.listen(3000)
