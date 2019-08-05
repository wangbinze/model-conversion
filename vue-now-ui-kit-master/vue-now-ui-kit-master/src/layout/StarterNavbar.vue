<template>
  <navbar position="fixed" type="primary" menu-classes="mr-auto">
    <a class="navbar-brand" href="http://www.paramland.com/">数地景观</a>
    <template slot="navbar-menu">
      <li class="nav-item active">
        <a class="nav-link" href="#">首页 <span class="sr-only">(current)</span></a>
      </li>
      <!--<nav-link to="/">-->
        <!--All components-->
      <!--</nav-link>-->
      <li class="nav-item">
        <a class="nav-link" href="#">模型查看和转换</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">模型百科</a>
      </li>
    </template>
    <template slot="navbar-menu">
    </template>
  </navbar>
</template>

<script>
import { NavbarToggleButton, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';

export default {
  name: 'main-navbar',
  components: {
    // DropDown,
    Navbar,
    NavbarToggleButton,
    NavLink,
    [Popover.name]: Popover
  }
};
</script>

<style scoped></style>
