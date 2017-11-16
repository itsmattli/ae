@extends('layouts.app')
@section('pageTitle', 'Matthew Li - Web Developer')
@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                @if(session('error'))
                    <p class="alert {{ Session::get('alert-class', 'alert-danger') }}">{{ Session::get('error') }}</p>
                @endif
                <div class="panel panel-default">
                    <div class="panel-heading">Castle Builder</div>
                    <div class="panel-body">
                        {{ Form::open(['url' => '/castles/calculate', 'method' => 'post'])}}
                        {{ Form::label('landscape', 'Enter landscape as comma-separated set of integers') }}
                        {{ Form::text('landscape', null, ['class' => 'form-control',
                                                            'required'=> 'true']) }}
                        <br />
                        <button type="submit" class="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @if(!session('error') && isset($castleCount))
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Result</div>
                    <div class="panel-body">
                            @for ($i = 0; $i < $castleCount; $i++)
                                <img src="https://vignette.wikia.nocookie.net/harrypotter/images/b/bd/Dhogwarts.jpg/revision/latest/scale-to-width-down/350?cb=20120128145344" width="50" alt="castle"/ >
                            @endfor
                            <h4>You will build {{$castleCount}} castles.</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @endif
@endsection