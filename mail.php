<?php
	//Recuperar los datos que serviran para enviar el correo
     $seEnvio;		//Para determinar si se envio o no el correo
     $destinatario = 'info@jonathanbravo.com';		//A quien se envia
     $elmensaje = str_replace("\n.", "\n..", $_POST['text']);     //por si el mensaje empieza con un punto ponerle 2
     $elmensaje = wordwrap($elmensaje, 70);                       //dividir el mensaje en trozos de 70 cols
     $cuerpomsg ='
<html>
<head>
  <title>Tienes un mensaje!!</title>
</head>
<body>
<p>jonathan Bravo, '.$_POST['name'].' - '.$_POST['email'].' te ha enviado un mensaje desde el sitio web http://www.jonathanbravo.com</p>
  <table>
    <tr>
      <td><b>Tu mensaje es:</b><br></td>
    </tr>
    <tr>
      <td>'.$elmensaje.'</td>
    </tr>
  </table>
</body>
</html>
 ';
//Establecer cabeceras para la funcion mail()
	//version MIME
	$cabeceras = "MIME-Version: 1.0\r\n";
	//Tipo de info
	$cabeceras .= "Content-type: text/html; charset=iso-8859-1\r\n";
	//direccion del remitente
	$cabeceras .= "From: ".$_POST['name']." <".$_POST['email'].">";
	if(mail($destinatario,"Mensaje desde sitio web",$cuerpomsg,$cabeceras)){
		$seEnvio = true;
	}else{
 		$seEnvio = false;
 	}
?>
