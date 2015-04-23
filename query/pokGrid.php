<?php

$connect2 = pg_connect("host='10.0.20.32' port='5433' dbname='postgis_21_sample' user='map_projekt' password='#cawos13'");

$geom = $_GET['coor'];


$result = pg_query($connect2, "
SELECT
        ST_AsText(ST_Collect((gv).geom)) AS geom
 FROM 
 (
    SELECT 
        ST_Intersection(rast,ST_GeomFromText('$geom',102067)) AS gv        
    FROM 
        test.cp_5m_odkaz
    WHERE 
        ST_Intersects(rast,ST_GeomFromText('$geom',102067))  
      ) as foo
");

$data = pg_fetch_all($result);
//echo json_encode($data);

$start = $data[0]['geom'];

    $result = pg_query($connect2, "SELECT ST_AsText(ST_DelaunayTriangles(ST_GeomFromText('$start',102067),0.0001,0)) AS geom");

    $trian = pg_fetch_all($result);


   echo json_encode($trian);



pg_close($connect2);

?>