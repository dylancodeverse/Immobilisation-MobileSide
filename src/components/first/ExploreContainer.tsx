import './ExploreContainer.css';
import myImage from './layers.png'; // Importez votre image
import myImage2 from './Connected-cuate(2).svg';
import { useEffect } from 'react';
import { hideTabBar } from '../../utils/utils';
import { Link, Redirect, useHistory } from 'react-router-dom';
const ExploreContainer: React.FC = () => {
  const history = useHistory();
  const onclick =()=>{
    history.push("/tab2")
  }
  useEffect(() => {
    // Appeler hideTabBar lorsque le composant ExploreContainer est monté
    hideTabBar();

    // Nettoyage lors du démontage du composant
    return () => {
      // Logique de nettoyage si nécessaire
    };
  }, []); // Le tableau vide [] assure que cela ne se déclenche qu'une seule fois

  return (
    <div className="container">
      <img src={myImage} alt="Description de l'image" className='logo'/>
      <p className='nunito-bold'>Immotrack </p> 
      <img src={myImage2} alt="woo" className='imgaccueil'/>
      <p className='nunito-bold2'> Facile parmi les services de suivi </p>
        <button className='button' onClick={onclick}> Commencer</button>
    </div>
  );
};

export default ExploreContainer;
