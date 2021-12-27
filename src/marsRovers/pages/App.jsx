import "../css/App.css"
import { ClipLoader } from "react-spinners"
import { useState } from "react"

const App = () => {
  const [data, setData] = useState([])
  const [date, setDate] = useState("2021-07-06"); //2015-08-06 opportuhity
  const [rover, setRover] = useState("curiosity");
  const [camera, setCamera] = useState("");
  const [loading, setLoading] = useState(true)

  const updateDate = (e) => { //onChange of inputbox, 
    setDate(e.target.value); //make userInput = input of box
    console.log(e.target.value)
  };

  const updateCamera = (e) => { //onChange of inputbox, 
    setCamera(e.target.value); //make userInput = input of box
    console.log(e.target.value)
  };

  const updateRover = (e) => { //onChange of inputbox, 
    setRover(e.target.value); //make userInput = input of box
    console.log(e.target.value)
  };

  const handleFetch = async () => {
    const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&api_key=${process.env.REACT_APP_NASA_KEY}`, {
      method: "GET",
    })
    //when calling data within handleFetch, returns empty, despite having assigned value to it line prior. When called outside handleFetch however, returns value as expected.
    const fetchData = await response.json() // returns object

    setData(fetchData.photos)
    setLoading(false) 
  }
  
  return (
    <div className="App">
      <h1>Mars rover images</h1>
      <button onClick={handleFetch}>Click me</button>
      <p>Date range</p>
      <input 
        type="date" 
        onChange={updateDate}
      />
      <p>Rover</p>
      <select name="rover" id="rover" onChange={updateRover} multiple>
        <option value="curiosity">Curiosity</option>
        <option value="opportunity">Opportunity</option>
        <option value="spirit">Spirit</option>
      </select>
      
      <p>Camera</p>
      <select name="camera" id="camera" onChange={updateCamera} multiple>
        <option value="FHAZ">Front Hazard Avoidance Camera</option>
        <option value="RHAZ">Rear Hazard Avoidance Camera</option>
        <option value="MAST">Mast Camera</option>
        <option value="CHEMCAM">Chemistry and Camera Complex</option>
        <option value="MAHLI">Mars Hand Lens Imager</option>
        <option value="MARDI">Mars Descent Imager</option>
        <option value="NAVCAM">Navigation Camera</option>
        <option value="PANCAM">Panoramic Camera</option>
        <option value="MINITES">Miniature Thermal Emission Spetrometer (Mini-TES)</option>
      </select>

      {loading ? (
        <ClipLoader loading={loading} width={150} height={5} />
        ) : (
          <ul>
            <p>Rover = {data[0].rover.name}</p>
            <p>Launch date = {data[0].rover.launch_date}</p>
            <p>land date = {data[0].rover.landing_date}</p>
            <div  class="grid">
              {data && 
                data.map((picture, index) => {
                  if (picture.camera.name == camera) { //couldn't get tertiary operators to work with this. Kept throwing up syntax errors. 
                    return (
                        <li key={index}>
                          <img class = "img" src={picture.img_src} alt="" />
                        </li>
                    )
                  }
                })
              }
            </div>
          </ul>
      )}

    </div>
  )
}


export {App}

// import { useState } from "react"
// import "./App.css"

// const array1=[
//   {img_src:'One.jpg', img_tag:'one tag'},
//   {img_src:'Two.jpg', img_tag:'two tag'},
//   {img_src:'Three.jpg', img_tag:'three tag'},
//   {img_src:'Four.jpg', img_tag:'four tag'},
//   {img_src:'Five.jpg', img_tag:'five tag'}
// ]

// const array2=array1.map(arrayItem => {
//   return arrayItem.img_src
// })

// array2 //one.jpg, two.jpg, three.jpg

// const App = () => {
//     const [data, setData] = useState([])
//     //   const [country, setCountry] = useState("uk")

    // const handleFetch = async () => {
    //     // const response = await fetch(`https://covid19-api.com/country?name=${country}&format=json`)
    //     const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_KEY}`)
    //     console.log(response)
    //     const data = await response.json()
    //     setData(data.hdurl)
    //     console.log(data.hdurl)
//     // }

// return (
//     <div className="App">
//     <h1>Movie DB Popular List</h1>
//     {/* <form
//         onSubmit={(e) => {
//         e.preventDefault()
//         setCountry(e.target.country.value)
//         handleFetch()
//         }}
//     >
//         <input type="text" name="country" />
//         <button type="submit">Submit</button>
//     </form> */}
//     {/* <p>{data ? data : "Click the button"}</p> */}
//     <button onClick={handleFetch}>click</button>
//     <div>
//         {data && (
//         <>
//             <p>{data.country}</p>
//             <p>{data.code}</p>
//             <p>{data.confirmed}</p>
//             <p>{data.recovered}</p>
//         </>
//         )}
//     </div>

//     </div>
//     )
// }

// export default App