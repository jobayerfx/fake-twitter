export default function ({ $axios }) {
  $axios.setHeader('Accept', 'application/json')
  $axios.setHeader('Content-Type', 'application/json')
  $axios.setHeader('Access-Control-Allow-Origin', '*')
}
