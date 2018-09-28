import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import styles from './NavigationItems.css';

const NavigationItems = (props) => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" active>Burger Builder</NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>

);

export default NavigationItems;