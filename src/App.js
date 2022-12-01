import './App.css';
import React,{useState} from 'react';
import axios from "axios";
function App() {
  const[image,setImage]=useState([])
  const[data,setData]=useState("")
  const [isHovered, setHover] = useState(false);
  const bookmark=[]
  const[showImage,setShowImage]=useState(false)
  const imageData=() => {
     axios.get(`https://api.unsplash.com/search/photos?page=1&query=${data}&client_id=4UhQL7IdZ55_AGB-WhQQNVlxTwun4XNQI0lXn6L-gqM`)
        .then((response) => {
          setImage(response.data.results)
          console.log(response.data.results);
        })
  }
  const addImage=(src)=>{
    bookmark.push(src)
  }
  return (
    <div className="App">
      <header><h1>React Photo Search</h1>
      <button onClick={()=>setShowImage(true)}>Bookmarks</button>
      </header>
      
      <div className="input-container">
        <input type="text" placeholder='Seach free high resolution images' onChange={(e)=>setData(e.target.value)} />
        <button type='submit' onClick={imageData}>Seach</button>
      </div>
      <div className="image-conatiner" onMouseLeave={() => setHover(false)}
      >
      { showImage ? bookmark.map((img,key)=>(
        <img src={img} alt="" />
      )):
        image.map((img,key)=>(
          <>
        <img src={img.urls.small} key={key} alt='' onMouseOver={() => setHover(true)}
      />
        {isHovered && (
          <button onClick={()=>addImage(img.urls.small)} >
            Add to Bookmark
          </button>
        )}
        </>
        )
        )

      }
      </div>
      
    </div>
  );
}

export default App;
