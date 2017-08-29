<template>
    <div>
        <br>
        <div class="logos">
            <br>
            <center>
                <img src="../../assets/logo.png" class="vlogo">
                <img src="../../assets/npm.png" class="vlogo">
            </center>
        </div>        
        <div class="row text-center"> 
          <h4 class="title">{{msg}}</h4> 
          <p> For a less detailed statistics, click <router-link to="/">here</router-link></p>
        </div> 
        <div class="row">
          <div class="col-md-4 col-sm-12 col-xs-12 col-md-offset-4">
            <form role="form" @submit.prevent="getPackageStats(packageName,periodStart,periodEnd)">
              <div class="row">
                <div class="form-group">
                    <input type="text" v-model="packageName" class="form-control" placeholder="Type npm package name" required>
                </div>
              </div>
              <span class="text-danger" v-show="errDate">Please all fields are required</span>
              <span class="text-danger" v-show="errorEnd">End date cannot go beyond today</span>
              <span v-show="errRange"> Range error: <code>Start date</code> is ahead of <code> end date</code></span>
              <div class="row">
                <div class="form-group col-md-5">
                  <div class="input-group">
                    <datepicker :calendar-button="btn" :calendar-button-icon="btnIcon" :bootstrapStyling="bootstrapStyling" v-model="periodStart" placeholder="Start date" required @change="disableDate"></datepicker>
                  </div>
                </div>
                <div class="form-group col-md-5" >
                  <div class="input-group">
                    <datepicker :calendar-button="btn" :calendar-button-icon="btnIcon" :bootstrapStyling="bootstrapStyling" v-model="periodEnd" placeholder="End date" required :disabled="disabled"></datepicker>
                  </div>
                </div>
                <div class="form-group col-md-2">
                  <button type="submit" class="btn btn-success btn-md" v-if="loadStats">
                    <i class="fa fa-search"></i>
                  </button>
                  <button type="button" disabled class="btn btn-success btn-md" v-else>
                    <i class="fa fa-spinner fa-spin"></i>
                  </button>
                </div>               
              </div>
            </form>
            <br>
            
            <div class="row" v-if="error">
              <div class="alert alert-danger fade in">
                <h4><i class="fa fa-warning fa-lg"> </i>Ooops! {{ errorMessage }}</h4>
              </div>
            </div>
          </div>          
        </div>

        <div class="row" v-if="loaded">
          <h5 class="title text-center">{{ packageInfo }} downloads per day from <span class="text-success"> {{ formattedPeriod }} </span></h5>
          <hr>
          <div class="col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
            <LineChart :chartData="downloads" :chartLabels="labels"></LineChart>
          </div>
        </div>

        <div class="row" v-if="loaded">
          <h5 class="title text-center">{{ packageInfo }} downloads per week <span class="text-success"> {{ formattedPeriod }} </span></h5>
          <hr>
          <div class="col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
            <LineChart :chartData="downloadsWeek" :chartLabels="labelsWeek"></LineChart>
          </div>
        </div>

        <div class="row" v-if="loaded">
          <h5 class="title text-center">{{ packageInfo }} downloads per month from <span class="text-success"> {{ formattedPeriod }} </span></h5>
          <hr>
          <div class="col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
            <LineChart :chartData="downloadsMonth" :chartLabels="labelsMonth"></LineChart>
          </div>
        </div>

        <div class="row" v-if="loaded">
          <h5 class="title text-center">{{ packageInfo }} downloads per Year from <span class="text-success"> {{ formattedPeriod }} </span></h5>
          <hr>
          <div class="col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
            <LineChart :chartData="downloadsYear" :chartLabels="labelsYear"></LineChart>
          </div>
        </div>
        
      </div>
</template>
<script src="./controller.js"></script>

<style>
   
</style>
