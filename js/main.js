
// On mobile, close the navbar when a link is clicked
$('*[data-toggle="tab"]').click(function () {
	if ($('.navbar-collapse').hasClass('in'))
	    $(".navbar-toggle").click();
});