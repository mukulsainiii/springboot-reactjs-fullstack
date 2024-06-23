import { useParams , Link} from "react-router-dom";
import { callHelloWorldRestApi } from "./API/HelloWorldApi";
function WelcomeComponent(){
    const {username}=useParams();
    callHelloWorldRestApi()
    .then((response)=>console.log(response.data))
    .catch((error)=>console.log(error))
    .finally(()=>console.log('clean up'))
    return(
      <div className='container'>
        <h1>Welcome {username}</h1>
        <h2>Manage Your <Link to={'/todos'}>Todos</Link></h2>
      </div>
    )
  }
  export default WelcomeComponent;