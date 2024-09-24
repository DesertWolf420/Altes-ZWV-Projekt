package ZWV::Project::Controller::REST::Flights;

use Mojo::Base 'Mojolicious::Controller', -signatures;

sub list ($self) {
  my $file = __FILE__;
  $file =~ s#/[^/]*\.pm$##;

  my $basedir = $self->app->basedir;
  $self->render(json=> { message => "Hello World! $file $basedir" });
}

1;
