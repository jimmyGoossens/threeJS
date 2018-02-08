
function multiSelect( event ) {    
    event.preventDefault();
//position 3D de la souris      
    var mouse3D = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,   
                          -( event.clientY / window.innerHeight ) * 2 + 1, 0.5 ); 
 // classe permetant de trouvr l'intersection entre deux objets                             
    var raycaster =  new THREE.Raycaster();                                        
    raycaster.setFromCamera( mouse3D, camera );
    var intersects = raycaster.intersectObjects( scene.children, true );
//si il y a un objet sélectionné
    if(intersects.length > 0){
      if(!selected.includes(intersects[0].object)){

        selected.push(intersects[0].object);
        // change la couleur de l'objet pour montrer qu'il est sélectionné
        intersects[ 0].object.material.color.setHex( 0x0000ff );
      }else{
        //redonner sa texture initiale à l'objet
        intersects[ 0].object.material.color.setHex( 0xffffff );
        var index = selected.indexOf(intersects[0].object);
        if (index > -1) {
          selected.splice(index, 1);
          }
      }

   }

}

function deSelect(){



} 
function supprimer(){

            control.detach(parentCube);
            scene.remove(control);
            scene.remove(parentCube);
            selected = [];

}