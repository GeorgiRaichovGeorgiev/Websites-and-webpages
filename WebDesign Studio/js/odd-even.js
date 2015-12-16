/* Adding margin to odd ".project" elements */
var elements = document.querySelectorAll('article');
for (var index = 0; index < elements.length; index+=1) {
	if(index % 2 === 0) {
		elements[index].style.marginRight = '30px';
	}
}

/* Adding margin to odd ".post" elements */
var elements = document.querySelectorAll('.post');
for (var index = 0; index < elements.length; index+=1) {
	if(index % 2 === 0) {
		elements[index].style.marginRight = '40px';
	}
}