import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './Profile.css'
import ReactPlayer from "react-player"
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";


const Profile = () => {

  const { id } = useParams()

  const user = localStorage.getItem('user');

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const Editprofile = () => {
    if(user === id){
      return(
      <Link to="/dashboard">
        <FaEdit size={30}/>
      </Link>
    )} else {
      return(
      <h2></h2>
      )}
  }


  useEffect(() => {
    axios
      .get('https://url-linkapi.herokuapp.com/pages/' + id)
      .then(res => {
        setData(res.data);
        setLoading(true);
      })
      .catch((err) => {
        setError(err);
        setLoading(true)
      });
  }, []);
  console.log(loading);


  return (
    <body>
    <div className="profile-details">
      { error && <div>Pagina não encontrada :(</div> }
      { loading ? data && (
        <div className="body">
          <title>{data.id} | sanchezroot.wtf</title>
          <img className="profile-picture"
              src={ data.image } 
          />
          <Editprofile/>
          <div className="profile-name">{ data.id }</div>

          <p className="desc">{ data.body }</p>

          <a href={ data.sociallink } className="social">
              { data.social}
          </a>
          <a href={ data.social2link } className="social">
              { data.social2}
          </a>
          <a href={ data.social3link } className="social">
              { data.social3}
          </a>
          <a href={ data.social4link } className="social">
              { data.social4}
          </a>
          <p className="author">⠀⠀⠀⠀</p>

          <ReactPlayer
            className='react-player'
            width='100%'
            height='100%'
            style={
              {margin: "auto"}
              }
            url={data.music}
          />

          <div className="author">
            <p>made with <a href="/">sanchezroot.wtf</a></p>
          </div>
        </div>
      ):(
        <div className="loader"></div>
      )}
    </div>
    </body>
  );
}
 
export default Profile;