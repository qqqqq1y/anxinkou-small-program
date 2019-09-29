import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home/view.home';
import bankLimit from '@/views/BankLimit/view.bankLimit';
import Login from '@/views/Login/view.login';
import OnceInfo from '@/views/OnceInfo/view.onceInfo';
import MoreInfo from '@/views/MoreInfo/view.moreInfo';
import Contract from '@/views/Contract/view.contract';
import Center from '@/views/Center/view.center';
import Sign from '@/views/Sign/view.sign';
import ContractImg from '@/views/ContractImg/view.contractImg';

import DetailMoreTimes from '@/views/DetailMoreTimes/view.detailMoreTimes';
import DetailOneTimes from '@/views/DetailOneTimes/view.detailOneTimes';

import Iframe from '@/views/Iframe/view.iframe';
import IframeAuth from '@/views/IframeAuth/view.iframeAuth';

Vue.use(Router);


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/bankLimit',
    name: 'bankLimit',
    component: bankLimit
  }, {
    path: '/onceInfo',
    name: 'onceInfo',
    component: OnceInfo
  }, {
    path: '/moreInfo',
    name: 'moreInfo',
    component: MoreInfo
  }, {
    path: '/contract',
    name: 'contract',
    component: Contract
  }, {
    path: '/center',
    name: 'center',
    component: Center
  }, {
    path: '/sign',
    name: 'sign',
    component: Sign
  }, {
    path: '/contractImg',
    name: 'contractImg',
    component: ContractImg
  }, {
    path: '/detailOneTimes',
    name: 'detailOneTimes',
    component: DetailOneTimes
  }, {
    path: '/detailMoreTimes',
    name: 'detailMoreTimes',
    component: DetailMoreTimes
  }, {
    path: '/iframe',
    name: 'iframe-page',
    component: Iframe
  }, {
    path: '/iframeAuth',
    name: 'iframeAuth',
    component: IframeAuth
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }
];


export default new Router({
  routes
});