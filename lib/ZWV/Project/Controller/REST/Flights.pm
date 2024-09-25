package ZWV::Project::Controller::REST::Flights;

use Mojo::Base 'Mojolicious::Controller', -signatures;
use DateTime;
use Data::Dumper;

sub list ($self) {
  my $basedir = __FILE__;
  $basedir =~ s#/[^/]+/[^/]+/[^/]+/[^/]+/[^/]+/[^/]+\.pm$##;
  my $rs = $self->schema->resultset('Flight')->search();

  my @flights;
  while (my $flight = $rs->next) {
    my $r={};
    for my $i (qw/id board time destination area/) { 
      $r->{$i} = $flight->$i() 
    }; 
    push @flights, $r;
  };
  
  $self->render(json=> {flights => \@flights});
}

sub copy ($self) {
  my $json = $self->req->json;
  my $search = (@{$json->{ids}||[]})?{id=>{'in'=>$json->{ids}}}:undef;

  my $rs = $self->schema->resultset('Flight')->search($search);

  my $now   = DateTime->now;
  my $today = {year => $now->year, month => $now->month, day => $now->day};

  my $count=0;
  while (my $flight = $rs->next) {
    my $ds = {};
    for my $i (qw/board destination flight area/) {
      $ds->{$i} = $flight->$i();
    }
    $ds->{state}   = 0;
    $ds->{created} = $ds->{modified} = $now->epoch;
    my ($H, $M, $S) = (split(/:/, $flight->time,2),0);
    $ds->{time}    = DateTime->new(%{$today}, hour => $H, minute => $M, second=>$S)->epoch;
    $self->schema->resultset('History')->find_or_create($ds) && $count++;
  }

  $self->render(json=> {message => "Created $count new entries in the history"});
}

1;
