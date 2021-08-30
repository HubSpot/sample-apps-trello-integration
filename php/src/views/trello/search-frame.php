<?php
use Helpers\UrlHelper;

?><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.css">
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/milligram/1.3.0/milligram.css">
  <link rel="stylesheet" href="<?php echo UrlHelper::generateServerUri(); ?>/css/search_frame.css">
  <script type="application/javascript" src="//code.jquery.com/jquery-1.10.2.min.js"></script>
  <script type="application/javascript" src="<?php echo UrlHelper::generateServerUri(); ?>/js/typeahead.bundle.min.js"></script>
</head>
<body>
    <form method="POST">
        <fieldset>
            <div class="row">
                <div class="column">
                    <h4>Search for Trello card to attach to the following HubSpot deal: <b><?php echo $dealName; ?></b></h4>
                    <input class="typeahead" type="text" placeholder="Search..">
                    <input type="hidden" name="card_id" id="cardId" />
                </div>
            </div>
            <input type="submit" value="Associate"/>
        </fieldset>
    </form>

    <script>
      $(document).ready(() => {
        const trelloCardsSource = new Bloodhound({
          datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          remote: {
            url: "<?php echo UrlHelper::getUrl('/trello/search'); ?>?q=%QUERY",
            wildcard: '%QUERY'
          }
        });
        // https://twitter.github.io/typeahead.js/examples/
        $('.typeahead').typeahead({
          hint: true,
          highlight: true,
          minLength: 1
        }, {
          name: 'trello-cards',
          display: 'name',
          source: trelloCardsSource,
          templates: {
            empty: [
              '<div class="empty-message">',
                'Unable to find any Trello card that matches the current query',
              '</div>'
            ].join('\n'),
          },
        }).on("typeahead:selected typeahead:autocompleted", (e, card) => {
          $("#cardId").val(card.id);
        });
      });
    </script>
</body>

</html>
