
//selectionner

var selected = [];
var control = new THREE.TransformControls(camera, renderer.domElement);
var box = document.getElementById("check");//check box
box.addEventListener("click", function(e){

	console.log(box.value);
	if(box.value === "on"){

		//box.value = "off";
		
		document.addEventListener( 'mousedown', onDocumentMouseDown );

		function onDocumentMouseDown( event ) {    
		    event.preventDefault();
		      
		    var mouse3D = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,   
		                          -( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );     
			var raycaster =  new THREE.Raycaster();                                        
				raycaster.setFromCamera( mouse3D, camera );
			var intersects = raycaster.intersectObjects( scene.children, true );


		    
		 	console.log(intersects);
		    if(intersects.length > 0){
		    	if(!selected.includes(intersects[0].object)){

		    	   	selected.push(intersects[0].object);
		    		intersects[ 0].object.material.color.setHex( 0x0000ff );
		    	}

		   }

		}	
					
	}//else{ document.removeEventListener("mousedown", onDocumentMouseDown);}

});

//manipuler la selection
var parentCube = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 100, 10, 10, 10), new THREE.MeshBasicMaterial({ color: 0xa1ff11, wireframe: true }));
var move = document.getElementById("move");
move.addEventListener("click", function(e){



			if(selected.length > 0){ 
	
		 		control.addEventListener( 'change', render );
				console.log(parentCube.position);
				console.log(selected[0].position);
		        scene.add(parentCube);
			        for (var i = 0; i < selected.length; i++) {
		            THREE.SceneUtils.attach(selected[i], scene, parentCube);
		            }

	         console.log(control);
	            control.attach(parentCube);
	            scene.add(control); 
		    }else {

	        	control.detach(parentCube);
	        	scene.remove(control);
	        	scene.remove(parentCube);
	            
					}

}); 

//set la selection 
var fix = document.getElementById("fix");
fix.addEventListener("click", function(e){
				        for (var i = 0; i < selected.length; i++) {
		            THREE.SceneUtils.detach(selected[i],  parentCube, scene);
		            }

		        control.detach(parentCube);
	        	scene.remove(control);
	        	scene.remove(parentCube);
	        	selected = [];
	        	console.log(selected);

});
//rotate la selection
var tourner = document.getElementById("tourner");
tourner.addEventListener("click", function(e){

	control.setMode( "rotate" );

});
//translate la selection
var translate = document.getElementById("translate");
translate.addEventListener("click", function(e){

	control.setMode( "translate" );

});
//supprimer la selection
var supprimer = document.getElementById("supprimer");
supprimer.addEventListener("click", function(e){

		        control.detach(parentCube);
	        	scene.remove(control);
	        	scene.remove(parentCube);
	        	selected = [];

});
//cloner la selection
/*
var duplicate = document.getElementById("duplicate");
translate.addEventListener("click", function(e){

	for (var i = 0; i < selected.length; i++) {
		selected[i].clone();
	}

});*/