import toastr from 'toastr';

$(document).ready(function(){
  $('.button-collapse').off('click').sideNav({
    closeOnclick:true,
    menuWidth: 250,
    // edge: 'left'
  });

  // // validate input
  // const firstname = document.getElementById('firstname');
  // firstname.onblur = () => {
  //   if(firstname.value.length <= 3) {
  //     alert('Firstname must be more than 3 characters');
  //   } else if(/(\d+)/gi.test(firstname.value)) {
  //     alert('Firstname cannot contain numbers');
  //   }
  // }

  toastr.options.closeButton = true;
});



