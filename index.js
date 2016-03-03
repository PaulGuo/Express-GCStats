'use strict';

var Falcon = require('open-falcon').init('http://127.0.0.1:1988/v1/push');
var falcon = new Falcon().tag('type', 'gcstats');
var gc = (require('gc-stats'))();
var debug = require('debug')('express-gcstats');

gc.on('stats', function (stats) {
    debug('GC happened', stats);

    falcon
        .step(20)
        .gauge('node.gcstats.gctype', stats.gctype)
        .gauge('node.gcstats.pauseMS', stats.pauseMS)
        .gauge('node.gcstats.before.totalHeapSize', stats.before.totalHeapSize)
        .gauge('node.gcstats.before.totalHeapExecutableSize', stats.before.totalHeapExecutableSize)
        .gauge('node.gcstats.before.usedHeapSize', stats.before.usedHeapSize)
        .gauge('node.gcstats.before.heapSizeLimit', stats.before.heapSizeLimit)
        .gauge('node.gcstats.before.totalPhysicalSize', stats.before.totalPhysicalSize)
        .gauge('node.gcstats.after.totalHeapSize', stats.after.totalHeapSize)
        .gauge('node.gcstats.after.totalHeapExecutableSize', stats.after.totalHeapExecutableSize)
        .gauge('node.gcstats.after.usedHeapSize', stats.after.usedHeapSize)
        .gauge('node.gcstats.after.heapSizeLimit', stats.after.heapSizeLimit)
        .gauge('node.gcstats.after.totalPhysicalSize', stats.after.totalPhysicalSize)
        .gauge('node.gcstats.diff.totalHeapSize', stats.diff.totalHeapSize)
        .gauge('node.gcstats.diff.totalHeapExecutableSize', stats.diff.totalHeapExecutableSize)
        .gauge('node.gcstats.diff.usedHeapSize', stats.diff.usedHeapSize)
        .gauge('node.gcstats.diff.heapSizeLimit', stats.diff.heapSizeLimit)
        .gauge('node.gcstats.diff.totalPhysicalSize', stats.diff.totalPhysicalSize);
});
