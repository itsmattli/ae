@extends('layouts.app')
@section('pageTitle', 'Matthew Li - Web Developer')
@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                @if(session('error'))
                    <p class="alert {{ Session::get('alert-class', 'alert-error') }}">{{ Session::get('error') }}</p>
                @endif
                <div class="panel panel-default">
                    <div class="panel-heading">Castle Builder</div>
                    <div class="panel-body">
                        {{ Form::open(['url' => '/castles/calculate', 'method' => 'post'])}}
                        {{ Form::label('landscape', 'Enter landscape as comma-separated set of integers') }}
                        {{ Form::text('landscape', null, ['class' => 'form-control',
                                                            'required'=> 'true']) }}
                        <button type="submit" class="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading"></div>
                    <div class="panel-body">
                        @if(isset($castleCount))
                            {{ var_dump($castleCount) }}
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection