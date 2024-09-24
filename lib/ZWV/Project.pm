package ZWV::Project;
use Mojo::Base 'Mojolicious', -signatures;

# This method will run once at server start
sub startup ($self) {

  # Load configuration from config file
  my $config = $self->plugin('NotYAMLConfig');

  # Configure the application
  $self->secrets($config->{secrets});

  # Router
  my $r = $self->routes;

  # Normal route to controller
  #$r->get('/rest/flights')->to('REST::Flights#list');
  $r->get('/'=> sub ($c) { $c->redirect_to('/index.html')});
}

1;
