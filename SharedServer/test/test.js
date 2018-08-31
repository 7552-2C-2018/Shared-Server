describe('Our App', function(){
	it('should understand basic math' , function (done){
		if (5==5){
			done();
		} else {
			done(new Error("Nor surely"));
		}
	});
});
