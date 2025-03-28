import { useState } from 'react'
import './App.css'

function App() {
  const [img, setImg] = useState("")
  const [loading, setLoading] = useState(false)
  const [qrData, setqrData] = useState("https://tutorjoes.in/")
  const [qrSize, setqrSize] = useState("150")

  
 
 
  async function generateQR(){
      setLoading(true)
      try{
          const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
          setImg(url)
      }catch(error){
          console.error("Error generating Qr Code", error)
      }finally{
          setLoading(false)
      }
  }

  function downloadQR(){
      fetch(img)
      .then((response)=>(response.blob()))
      .then((blob)=>{
          const link = document.createElement("a")
          link.href = URL.createObjectURL(blob)
          link.download = "qrcode.png"
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
      })
      .catch((error) => {
          console.error("Error download QR code", error)
      }) 
  }
return (
  <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait....</p>}
      {img && <img src={img} className="QR-code-img" />}
      <div>
          <label htmlFor="dataInput" className="input-label">Data For QR Code</label>
          <input type="text" value={qrData} id="dataInput" placeholder="Enter data for QR code" onChange={(e) => setqrData(e.target.value)}></input>
          <label htmlFor="sizeInput" className="input-label">Image size (e.g., 150) </label>
          <input type="text" value={qrSize} id="sizeInput" placeholder="Enter image size" onChange={(e) => setqrSize(e.target.value)}></input>
          <button className="generate-button" disabled={loading} onClick={generateQR}>Generate QR Code</button>
          <button className="download-button" onClick={downloadQR}>Download QR Code</button>
      </div>
      <p className="footer">Designed By <a href="#">00</a></p>
  </div>
)
}


export default App
