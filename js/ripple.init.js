// Ripples (only when hero element exists and jQuery/ripples loaded)
if (typeof home !== 'undefined' && typeof $ !== 'undefined' && $.fn.ripples) {
  var $hero = $(home);
  if ($hero.length) {
    $hero.ripples({
      resolution: 512,
      dropRadius: 15,
      perturbance: 0.01,
    });
  }
}