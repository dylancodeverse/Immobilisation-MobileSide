export const hideTabBar = (): void => {
    const tabBar = document.getElementsByClassName('navtab');
  
    // Vérifiez s'il y a au moins un élément avec la classe 'navtab'
    if (tabBar.length > 0) {
      // Accédez au premier élément avec la classe 'navtab' et modifiez sa propriété de style
      (tabBar[0] as HTMLElement).style.display = 'none';
    } else {
      console.log('La classe navtab n\'a pas été trouvée.');
    }
  };