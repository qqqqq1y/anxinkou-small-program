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
    path: '/web/home',
    name: 'home',
    component: Home
  }, {
    path: '/web/bankLimit',
    name: 'bankLimit',
    component: bankLimit
  }, {
    path: '/web/onceInfo',
    name: 'onceInfo',
    component: OnceInfo
  }, {
    path: '/web/moreInfo',
    name: 'moreInfo',
    component: MoreInfo
  }, {
    path: '/web/contract',
    name: 'contract',
    component: Contract
  }, {
    path: '/web/center',
    name: 'center',
    component: Center
  }, {
    path: '/web/sign',
    name: 'sign',
    component: Sign
  }, {
    path: '/web/contractImg',
    name: 'contractImg',
    component: ContractImg
  }, {
    path: '/web/detailOneTimes',
    name: 'detailOneTimes',
    component: DetailOneTimes
  }, {
    path: '/web/detailMoreTimes',
    name: 'detailMoreTimes',
    component: DetailMoreTimes
  }, {
    path: '/web/iframe',
    name: 'iframe-page',
    component: Iframe
  }, {
    path: '/web/iframeAuth',
    name: 'iframeAuth',
    component: IframeAuth
  }, {
    path: '/web/',
    name: 'login',
    component: Login
  }
];


export default new Router({
  mode: 'history', // hastory hash切换
  routes
});