import 'jquery'
import '../assets/materialize/js/materialize.min';

$(document).ready(() => {
  $('.button-collapse').off('click').sideNav({
    closeOnclick: true,
    menuWidth: 320,
  });
  $('select').material_select();
});
