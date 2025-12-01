let startNum = 12;
let endNum = 500;
const duration =10; // 1000 miliseconds

$w.onReady(function () {
   setInterval(() => {
	   countUp;
   }, duration);
});

function countUp() {
	if (startNum <= endNum) {
		$w('#text482').text = startNum.toLocaleString();
		startNum += 5;
	}

}