package ZWV::Project::Controller::REST::History;

use Mojo::Base 'Mojolicious::Controller', -signatures;
use DateTime;
use Data::Dumper;

sub list ($self) {
  my @history = ();

  my $json  = $self->req->json;
  my $search;
  if (($json->{filters}->{time}||'') eq 'today') {
    delete $json->{filters}->{time};
    my $now   = DateTime->now();
    my $begin = DateTime->new(
      year   => $now->year,
      month  => $now->month,
      day    => $now->day,
      hour   => 0,
      minute => 0,
      second => 0,
    );
    my $end = DateTime->new(
      year   => $now->year,
      month  => $now->month,
      day    => $now->day,
      hour   => 23,
      minute => 59,
      second => 59,
    );
    $search = {
      '-and' => [
	{'time'=>{'<='=>$end->epoch}},
	{'time'=>{'>='=>$begin->epoch}},
      ],
      %{$json->{filters}},
    };
  } else {
    $search = $json->{filters} || undef;
  }
  
  my $rs = $self->schema->resultset('History')->search($search);

  my @flights;
  while (my $flight = $rs->next) {
    my $r={};
    for my $i (qw/id board time destination area state created modified flight/) { 
      $r->{$i} = $flight->$i() 
    }; 
    push @flights, $r;
  };
  
  $self->render(json=> {flights => \@flights});
}

sub update ($self) {
  my $id    = $self->param('id');
  my $json  = $self->req->json;
  my $state = ($json) ? $json->{state} : $self->param('state');
  my $row = $self->schema->resultset('History')->find({id=>$id});

  $row->modified(time);
  $row->state($json->{state}) if exists $json->{state};
  
  my $message = ($row->update) 
    ? "Updated history entry with id '$id' sucessfully"
    : "Failed to update history entry with id '$id'"
    ;

  $self->render(json=> {message=> $message});

}
1;
