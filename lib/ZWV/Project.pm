package ZWV::Project;
use Mojo::Base 'Mojolicious', -signatures;


# This method will run once at server start
sub startup ($self) {

  # Load configuration from config file
  my $config = $self->plugin('NotYAMLConfig');

  $self->plugin('DBIC');

  # Configure the application
  $self->secrets($config->{secrets});

  # Router
  my $r = $self->routes;

  # Normal route to controller
  $r->get('/rest/flights/list')->to('REST::Flights#list');
  $r->post('/rest/flights/copy')->to('REST::Flights#copy');
  $r->post('/rest/history/list')->to('REST::History#list');
  $r->put('/rest/history/:id')->to('REST::History#update');
  $r->get('/'=> sub ($c) { $c->redirect_to('/index.html')});
}

1;
