(function (angular) { 'use strict';

  /**
   * Advert directive.
   */

  angular.module('picjam.game.question', [])
  .directive('pjQuestion', function ($timeout, $interval) {
    return {
      restrict: 'E',
      scope: {
        question: '=',
        timer: '=',
        game: '='
      },
      templateUrl: '/app/game/question/question.html',
      controllerAs: 'question',
      link: function (scope, element) {
        var img = element.find('img');
        var interval;

        scope.$watch('question', function (question) {
          $interval.cancel(interval);

          if (!question || question.answer) {
            if (question && question.type === 'svg') {
              question.imageUrl = '/assets/svg/4.svg';
            } else {
              img.removeClass('blur');
              img.css('transition', 'none');
            }
            return ;
          }

          if (question.type === 'svg') {
            question.step = 0;
            question.imageUrl = '/assets/svg/0.png';
            interval = $interval(function () {
              if (question.step < 4)
                question.imageUrl = '/assets/svg/' + (++question.step) + '.svg';
            }, 1000);
          } else {
            img.addClass('blur');
            // Wait render.
            $timeout(function () {
              img.css('transition', 'all ' + question.time + 'ms ease-out');
              img.removeClass('blur');
            });
          }
        });
      }
    };
  });

}(window.angular));
