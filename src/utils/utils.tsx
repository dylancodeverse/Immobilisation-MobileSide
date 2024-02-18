import { useHistory } from "react-router";

export const hideTabBar = (): void => {
    const tabBar = document.getElementsByClassName('navtab');
  
    // Vérifiez s'il y a au moins un élément avec la classe 'navtab'
    if (tabBar.length > 0) {
      // Accédez au premier élément avec la classe 'navtab' et modifiez sa propriété de style
      (tabBar[0] as HTMLElement).style.visibility = 'hidden';
    } else {
      console.log('La classe navtab n\'a pas été trouvée.');
    }
  };

export const showTabBar = (): void =>{
  const tabBar = document.getElementsByClassName('navtab');
  if (tabBar.length > 0) {
    // Accédez au premier élément avec la classe 'navtab' et modifiez sa propriété de style
    (tabBar[0] as HTMLElement).style.visibility = 'visible';
  } else {
    console.log('La classe navtab n\'a pas été trouvée.');
  }
}



export const UseNavigation = () => {
  const history = useHistory();

  const handleClick = (param: any): void => {
    history.push(param);
  };

  return { handleClick };
};