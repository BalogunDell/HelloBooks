import '../assets/materialize/js/materialize.min';

$(document).ready(function(){
   $('.button-collapse').off('click').sideNav({
    closeOnclick:true,
    menuWidth: 280,
    // edge: 'left'
  });
  
  // Initialize materialize select
  $('select').material_select();

});



