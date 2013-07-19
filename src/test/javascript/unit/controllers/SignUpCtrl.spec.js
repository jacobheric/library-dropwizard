describe('SignUpCtrl', function() {
  var $scope = null;
  var $httpBackend = null;
  var $controller = null;

  beforeEach(module('library.controllers'));
  beforeEach(module('library.services'));

  beforeEach(inject(function($rootScope, _$controller_, _$httpBackend_) {
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $controller = _$controller_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should save new user', inject(function($location, authService) {

    var user = { email : 'email', password : 'password', confirm : 'password' };
    
    spyOn(authService, 'login');
    
    $controller('signUpCtrl', {
      $scope : $scope
    });

    $httpBackend.expectPOST('api/users', user).respond(200);

    spyOn($location, 'path');

    $scope.signup(user);

    $httpBackend.flush();

    expect($location.path).toHaveBeenCalledWith('/books');
//    expect(authService.login).toHaveBeenCalledWith(user, 'password');

  }));

  it('should error for duplicate email', inject(function($location, authService) {
    
    $controller('signUpCtrl', {
      $scope : $scope
    });
    
    $httpBackend.expectPOST('api/users', { email : 'email' }).respond(409);
    
    $scope.signup({ email : 'email' });
    
    $httpBackend.flush();
    
    expect($scope.error).toBe('This email address has already been registered, please use another.');
    
  }));
  
});
