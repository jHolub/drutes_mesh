<?php

// Author:Jir Holub
// 1. ulozeni vyberu do db 
// 2. odesle hightlight na klienta


$connect2 = pg_connect("host='10.0.20.32' port='5433' dbname='postgis_21_sample' user='map_projekt' password='#cawos13'");





if (isset($_GET["coor"])) {

    $data = array(array("geom" => $_GET["coor"]));
    $geo = $_GET["coor"];

    for ($dif = -2000; $dif < 0; $dif = $dif + 5) {

        $result = pg_query($connect2, "SELECT ST_AsText(ST_Buffer(ST_GeomFromText('$geo'),$dif)) AS geom");

        $data = array_merge($data, pg_fetch_all($result));
    }
    //echo json_encode($data);



    $start = $data[0]['geom'];
    for ($i = 1; $i < count($data); $i++) {

        $g = $data[$i]['geom'];

        $result = pg_query($connect2, "SELECT ST_AsText(ST_Collect(ST_GeomFromText('$start'),ST_GeomFromText('$g'))) AS geom");

        $res = pg_fetch_all($result);
        $start = $res[0]['geom'];
    }
    //echo json_encode(array(array("geom" => $start)));


    $result = pg_query($connect2, "
SELECT ST_AsText((g.gdump).geom) as geom FROM           
(SELECT ST_Dump(ST_CollectionExtract(ST_DelaunayTriangles(ST_GeomFromText('$start'),0.0001,0),3)) AS gdump) AS g 
            ");

    $trian = pg_fetch_all($result);


    echo json_encode($trian);




    pg_close($connect2);
}
?>