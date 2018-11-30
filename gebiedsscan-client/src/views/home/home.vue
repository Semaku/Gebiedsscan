<template>
  <div>
    <div class="uk-section uk-section-xsmall bg-arquitect-pattern-dark">
      <div class="uk-container uk-container-small uk-light">
        <nav class="uk-navbar-container uk-margin uk-navbar uk-navbar-transparent" uk-navbar="">
          <div class="uk-navbar-left">
            <a class="uk-navbar-item uk-logo uk-logo-home uk-text-uppercase" href="#">GebiedsInnovatie platform</a>
            <!-- <ul class="uk-navbar-nav">
              <li class="uk-active uk-visible@m"><a href="#"><img style="height:40px;" src="https://www.utrecht.nl/typo3conf/ext/alternet_sitepackage/Resources/Public/Images/svg/wapen-utrecht-rood.svg" alt=""></a></li>
              <li class="uk-active uk-visible@m"><a href="#"><img style="height:30px;" src="https://www.eindhoven.nl/themes/eindhoven/logo.svg" alt=""></a></li>
            </ul> -->
          </div>
          <div class="uk-navbar-right">
            <ul class="uk-navbar-nav uk-visible@m">
              <!-- <li class="uk-active"><a href="#">Mijn plan</a></li> -->
            </ul>
            <div class="uk-hidden@m">
               <a class="uk-navbar-toggle uk-navbar-toggle-icon uk-icon" href="#" uk-navbar-toggle-icon=""
              aria-expanded="false">
              <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                   ratio="1">
                  <rect y="9" width="20" height="2"></rect>
                  <rect y="3" width="20" height="2"></rect>
                  <rect y="15" width="20" height="2"></rect>
                </svg>
              </a>
              <div class="uk-navbar-dropdown uk-navbar-dropdown-bottom-right"
                 uk-drop="mode: click; cls-drop: uk-navbar-dropdown; boundary: !nav; flip: x"
                 style="left: 271px; top: 80px;">
                Mijn Account
              </div>

            </div>
          </div>
        </nav>

      </div>

      <div class="uk-section uk-section-xsmall uk-light">
        <div class="uk-container uk-container-small">
          <h3>Een innovatief Nederland voor iedereen</h3>
        </div>
      </div>

      <div class="uk-section uk-section-small">
        <div class="uk-container uk-container-small">
          <div class="uk-light">
            <ul uk-tab>
              <li class="uk-active"><a href="#">Initiatief zoeken</a></li>
              <li>
                <router-link class="uk-light uk-link-muted uk-text-small" :to="{name: 'explore', params: { subroute: 'mijnplan'}} ">
                  Mijn plan
                </router-link>    
              </li>
            </ul>
          </div>

          <a href="#search-window" uk-toggle>
            <div class="uk-margin uk-navbar-container uk-navbar uk-dark">
              <div class="uk-navbar uk-width-1-1">
                <div class="uk-navbar-item uk-width-1-1">
                  <form class="uk-search uk-search-navbar uk-width-1-1">
                    <button class="uk-search-icon-flip uk-search-icon uk-icon"
                        uk-search-icon=""></button>
                    <input class="uk-search-input small-placeholder" type="search"
                         placeholder="Zoek op plaats, project, deelproject, initiatief of straat en huisnummer">
                    <SearchWindow targetRoute="explore" modalId="search-window"></SearchWindow>
                  </form>
                </div>
              </div>
            </div>
          </a>

          <div class="uk-grid-match uk-child-width-auto uk-flex-between uk-grid" uk-grid="">
            <div class="uk-first-column">
              <div class="uk-panel">
                <router-link class="uk-light uk-link-muted uk-text-small" :to="{name: 'explore', subroute: 'bekijken'}">
                  Zoeken met de kaart
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-section uk-section-small">
      <div class="uk-container uk-container-small">
        <h4 class="uk-heading-line"><span>Onlangs toegevoegde projecten en initiatieven</span></h4>

        <div class="uk-child-width-1-2@m uk-grid" uk-grid="">
          <div class="uk-first-column">
            <router-link
                :to="{name: 'explore', params: { subroute: 'bekijken', searchtype: 'element', query: 'Kanaalzone Zuid'}}">
              <div class="uk-cover-container uk-light uk-inline-clip uk-transition-toggle ">
                <canvas width="400" height="150"></canvas>
                <img src="https://indebuurt.nl/eindhoven/wp-content/uploads/2017/09/zuivelfabriek.jpg"
                   alt="" uk-cover>

                <div class="uk-text-center uk-overlay uk-overlay-primary uk-transition-slide-top-small ">
                  <h3 class="uk-margin-remove uk-position-center">Kanaalzone Zuid</h3>
                </div>
              </div>
            </router-link>
          </div>
          <div class="uk-grid-margin uk-first-column">
            <div class="uk-cover-container uk-light">
              <router-link
                  :to="{name: 'explore', params: { subroute: 'bekijken', searchtype: 'element', query: 'Merwedekanaalzone'}}">
                <div class="uk-cover-container uk-light uk-inline-clip uk-transition-toggle ">
                  <canvas width="400" height="150"></canvas>
                  <img src="https://images2.persgroep.net/rcs/RLhPkZ4oMN22XBUCTdxw01T4IZY/diocontent/116018103/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&amp;quality=0.9"
                     alt="" uk-cover>

                  <div class="uk-text-center uk-overlay uk-overlay-primary uk-transition-slide-top-small ">
                    <h3 class="uk-margin-remove uk-position-center">Merwedekanaalzone</h3>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <div>
            <div class="uk-cover-container uk-light">
              <router-link :to="{name: 'explore', params: { subroute: 'bekijken', searchtype: 'element', query: 'Visie Beurs'}}">
                <div class="uk-cover-container uk-light uk-inline-clip uk-transition-toggle ">
                  <canvas width="400" height="150"></canvas>
                  <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUUExMWFhUXGRoaGRgYGSEdIBseISAdIBoeHx0eICggGx8lHSAdITEhJSkrLi4uIB8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLS0tLy0tLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAJoBRwMBIgACEQEDEQH/xAAbAAADAAMBAQAAAAAAAAAAAAAEBQYCAwcAAf/EAEIQAAIBAgQEBAQDBQYGAgMBAAECEQMhAAQSMQVBUWEGEyJxMoGRoUKxwRQj0eHwBzNSYnKCFSSSorLxQ8IWk8OE/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDBAAF/8QAKREAAgICAgICAgICAwEAAAAAAAECEQMhEjEEQSJRE2FxoTKBI0KxBf/aAAwDAQACEQMRAD8AuuItRYDzNbxMKigTe0GSL7z+WFGeyjIPQz0wAGdFcghTOkvEBphrAWA7zh9UV5lUgAQIAt1uZm08rYT1OH+W1V6lRWq1JMAyVGyDrYGfeMSbK0S7ZosSQx0j3v1+/wCWBMzWqVay0EbQSfjYco5WJJjl+V8G8LyL5ms1IOKHl+ojTciQDcWAFuR3HLFfxLI5ajTpApSNTUoLGNSqx0lwbMYE3nr0jBWhXs15DL0KQNIqC19ZEEraDJIJAgzdrWMc8THiumKGqooYtKkKuqUAM62HtPMGGMgbYq8w1Gj8HltUY+lECr02FlHqOqSbnnG0x4NHmZQqtDzWovUGpmVCFYlxJJmINxsb74H7Or0DcL4jUatqASoc0VZ6YW6WsSx9KbAmTMi0wJsGzz0VRa9UIxEIqkGRyjY2G+lgO/I5cH4aq+o0adNKi/vEu+mx+JmJSD32+eAvEGRSsUCD4GdmqHd2IXYG+iw9QtAVR2NnJGWaziqCBSQxEl4Psb3O+zFsSXEodpQDUSwOmTq/EsmZJ33uZwfxOj5dENmKxZjA0INIJvcljB/1EE8uWJ6lxFjKCkp1TLFrgCIjTaZ7dcBrXJsKdOqNFbOTqWJAnUeX354mjmleoummBTU7f4wDJntyxv4vmzUc0kJi+si9+ne+/e3I4ccL4lRpmkGyg/dg6YYgnYlob4zN499uZxxf+TEk7dFp4fzJq0lZKQRQJH+obi0EgmSdpjCHL+HDVXzASpJkzEQCdlAEdAPvil4Pn1qglUpQxnSDcEGfhBGnlaBz63b8Fer6oXy6cSZDrrZixP4CyhBBg8m7CFSd6KNqtiM0XXLETrcqAha4JNoKkzOm0nmImd8+FcB8pnqo4WuQsjSrHb/MDpNm2jph7lczWNR6bEop+D0AFQD6TZZk73nbpjXmVqItVwCajhbqJJ5TeLgE32vh6YjexZxOoKSMMw9XUU1/umCkDXCwAsA3gn8scwztEu1apT1qQS+g1C7aS0AA/E2kTJ6DHV+K8NGaY01puspU1VKgPpVBqpgCB/8AJEjp74SUf7NKU6mzFXVNigVY3NpBP3w0YpAk2zT4V4UtbKhlRi7KxaWIAqnUZIJ/zSYH5YX8F8GvmctSqqxVWE69zu4MoT2UCNgQTzw64nWzfDKZNPTVpsfVUKyZgAaxOlTAAkCD72w/4VxVKXDBUFRQyKSfxkesgeiZMgdsCmgSmnSoU5fhdWnkNFdAWpUHnSzaP3Ymm0EgaoAMxvOInhPgmrUpNWL6FFNHDj1KwKlnHbQAPebTivo+OddN/NrGnEA/8uJ9RsPxbwRcXv7421uMill2pPVcrWQtqFBydLzJtAWbjTCxIsMDkw8UQvG/DtbKtM+YhW1UQL9NBJNl5kRfC08T9YQqSwIuDc2FoHbHQPF3mNTWjWrJSdELAeQxmATdht6VtP0vjnWW4Yz1WZWUsg1EExInSABa8nbDJcv8jn8eior5RnT90GzCyLUkckgmV1KE9B5wx69Dgvwlwmm2aQOgP7qo7Da66NIIjcH35dMIOAeKa+WDihSpszENLKWsA2ygqdyLzbpiq8FZonNPWP4cnXaw5lqJHe98coqPQG7FWe8OUaarW/aDUeQopKupma8hSdIMCed4tiP8QU3Su49aKCCgO4BAYCOokfTHQs1UWhTy7qgZaNbUwAhz6XBZjFgC8k9YHPE/4m8rMEZh2Vap9L0gxk6TAIEGJXnYfMGVi0n0NJa0xhmcl+0UFrU6KsTTYhaNFVIaSGlrA6TpEG5gkTMBNwnzhRKikpdTBDQDNugv9RN8LkzbBRT1FFUt85JNyDveIwz4TXbSDqaZsCSbdjhZy4rY0FbBOE5RKwPnAIZs0SsSJG5IJuJ7Tyu24dRqeZmKaV6lMDQCUBGtTMA6TfSQReefzkeJZZ6YDGwYtC9INh9PpjTls+6fCzLcEgGx6SJgxynFKtWhE6ezoPhrgQqZiqajnyRrUlLEsugbXI+KZFwRY4w8S1RQd6QplkRRF2kgj8Whrj7e2H/9nbBctTLEBmLMAYk6nbl7KDtthZ4o8MmtmaSiqA2ZaoPgB0eWitM2JWDBvzF8JdS2Mla0SHAuJ+sq9OU1AE2kFphbiYMH2jD7LZYO9ejUo6IGqkUMkj8KyZuQDLH6Xu+yn9mFEoGNRuYcAWYgkEgFtt47e+D8nlqLM9MlU0P5VNiwMkU1qGBoHpAOncXEbxgOa9DRg/ZIZN9SBvIdq1M+pL8iBqkyzAhYNyDqcXtjfks/SogiooqZdtXrqIxKxMKLgKeUWuewwz8ReGfKStmKeZI0oGqaRpDfFaVNyb25SOuFtWrlaVIU6mYE0zrSn5bMpLSQKganD3c7GLA8sFOwNJG6nmKBU1FWmq7wDVYAH0iSFMCYMyMNsjk4UA0NRIvHmrq6ADROo78uQiMS/mef5i5RFUEo8akpaQIsQoQXKiY7++PvDuMGsDqreXW3Us9VlqERaFdjzMT6d77jHUCw/jmVaLZUawBJQ1fSO5ZAO0GDfscexL5/j9fXozFFFj1BGpkb8wGPbf3vj2GoB3FkcEwE7xb9d/ywvzVKrsAv126kmf6t0wxSusXU2Gwb9Y/q++EvF88qEMtMgmxGo36SNoA598LQ1mijSqUq2umqGpEEkjbnN7CY+mN2Y4hmCSWFOItpmWPKYMjr8uWMK2adUU6FLudIHqAmJUsfMECbc+Qxoz+dfzEpU6YaqbOF1uKX+p/MEHlEGDcwL4B1n3McRzABAFEWJJj6zffcfxxhT4nWQu4WiGq6QwYbhQQvMbAxf25YXZ/92QQ7FoB0sG06bH/ExsLSLmd9iEfi7PVNKOFCgekrLGSQYI1MTsMBbdBelZZ5TjmaK6Yp6AApNyTERBJj7fpjSmYbWAFBYbsbwOkzI5/0bzvCuIaKSrU1aiAQVJ5kbAg8mAiOa9cMeH55CpLH1NcBPTN1jUWWDbU1rRF526S4q2cnfQ4qV1iHpo6kwFZbE3Em97GJPLE7x7gMgPQQI4mUDQPZd9J7bY+ZvxZlqTLrp1jvdWQ26wUHPlPLDDIZ+lmUJpftKTcBqUhhFyAHgr3EfrgpurQrro5wWdSRo0kGCPUL/IgYypZliYIgc/U38cWPF6lKpSYlRVYBtDAFW5STK+kCR6T8uuEnAvDOZzFJqtGnIDFRZzJAkgFF7jfn7YvGdrZKUKAFqEGQx+TH+OOy+As6zZKkWJaA4N+jlVE9YHyvjjObapRc06tG6kqbspnneZ+Zm2Op/wBmmdWpkkCq8LUcbaoPpeDMk/ECIF+gx02qBGxj4142MvTWoUNS7wPTHpN51bWJj2tic8F+MFzWZNMUVQmmxlVWfiQRIAPP7YtMzw1K6KCZkiICkgjVqBDKQLkyImRgTKeGKdOqtakxLRAOinMHkYQHkD74Qcf5ZrsD8Wl9/cwPe1/47qcjUY1XUxpRU5XLsCzfIKVgdz2g/KroIcvMKdVlAjSxFwPf7Y05SmAWawLEE33hVX9I+WCjg6nSRrFQQRBB5g7gg7i2JrxbwXLUMuwXRSRtIOpgBGomBrYKCSSIF72G2KPLqwJsYtBwq8V1JpFWYiYWz6SZ5RYPa8b298ccS/C89w9mPlUiyh1qOYDAEGQdRcxEdQLYoF8a5ZqmhNbkn8Ok++zXjfHPM7wEWNKWM/jJXpzUkjCvN0yHKPp1DYamN9xeP57Y5Y79gc69HUs/mRUy70SlQ6gZJECJneSR054gvDOV0VmoPax0mJswJkGLj8VumAeH8eqUZ0mmyncF6n2sI98F5vidHMKszSqqQVZLm021m8Xnbf7jg0H8iG3hrw6MpmDVXQDpZPLLgQT3J2sOTTMgxGD1y9QZupVbytDEGAy/AG1KIBMGQJMX07SZwLwbP1K1Jw4BdbBkA0wBq0gkkaollIAMysdCjk6jgMKVUKQNwgsYMwqyfrhHdjKqPeIM2MzT8kLSp02ZPNbS2oKILeXppwSSBub374CahllXQKQLLs7agWNvUQIAb5/pgn9ldjC0b7EySQLCd+kGDhdmKxVtLBZ7lR9dx1vgNNhTSEWc4GrtZAscwd+pMwRtymLb749Q4VUAhQOUaiP0PtihFCs16aqVtDWPvsTEbG83FsKuL5upl2TzFCzqgwBPp5E9CQb9O+A4t6DySFmY4VUcBWUGBf1KQec7411/CisBDBDzG47bxy74aZUlmUZYtXDeYSoRmM+koFVhq/xzeIjaL6P+J1aTumboVqIaQhZGUr3CyoYdwTfrtgxg4+xW0xv4K4QlA1WzJpspAVLzPy5HbfqcYVVq1Cann6WBbS3mQwmPhIYwCBFvaMB8O4mGBBRivIk3PyHLbv74318yhkrTm23mEde0TGOd2MujZkM9X0w2Yq87CqxETA3N9gbdT3GFfCeBU6lSp+2ViAQCrqsljcEEsLRA364YDLKJJqUiDsPNNrCR/ddbz3jGrPNTVQVUVJEkLUAg8xdAJt15jATphaM8hw7L0/NQ0qdWmGGh66Co7CPVanWQIoYCAZMkkxymfE3DKrZioyaqiE6/SrC5AZlCktEElbE7dMUKaP8AJ/8Au/jSE4BcSxE0wOTGT0GwBM3npE87YKk7Bx0XXC8pw4ZeitRMuzBFkug+KBO4sZPyxzvKcOVs9LhEyzVX+H0qi+plAFisQsWibYJSo4DWQ3gxA5i4B3Htyv1OMBWdmkADSRI1ABpMcze55HubY5No5ofeP3yr0Q/qzNZdKKBUl1UE2sDbfcRcdsewBwriYaqoroFS8smokWtzIuf1x7ATaC6s6XqERtHxfoR2j+rY2VzQQAskkWkjVH9RvGJbN8WZKqU1OqtZnC2XTf0xAud5gAdL4acQzEglyHUbm67kAdrzO3P5YpFpdkpRclSMc1n9bQWQupldaiQe2oXPt0xjlHJLTTQ7ksaaiSTJ/DMk35k4mH46hJK0nZUIZn1rA9QiWKqBJMb/AFwZVzrVxq0QqEQLh1JH70OGAiCFEj354spRXaMs8WR9PoZ5/L5YXWgSS0kgkRPIX2tsbdsAZzhtNldjULlrS4ELKnTOwK8+UQL2ELctlamv01SAWuNUyD2Bj6/bG7jPF6ekokOy7GCsMJA1alDAqN47iTaFyfjrS2Niefn83ola+Wr5chKjimB8LHZjMiCRe4FrRHbGt8+FWXdW0AKugAEgDSLC0wBf5nDCrmj5RR31KRsfzHfphXw/gFSsXbV5SLZdQBLG1gCw2EEmea94zxTy6Zpm1BWOfAeTbN5hq9WmTRpygKqD5bNcE/KF2/HPI46A+UWGWjVcu2kqGjSip8TALO7ESTFzb8Qwg/s1y4p0s9QLM5aktQBkCiU1TEM2oEso+WLzKKop1dKBQdTQoAt+7K9OTNvh5qtAg72SuR8J1WlGKeWFb0oCNgTYGxZtiTeI6YBzXiKvkKCU8udGsqB6QdJICrqlTsoCiB+Eb4pMt4loqdQaSoazMm6rBkBiQBIn3HaUteijUw0BSGEAIsH1DQRYAMRpa5tI2jCJlHsg85wjM1napUZ2qMZYmnWmeUgUoFsXv9luRejl6yOmk+YXVtLDdEWV1qCLg8pt9UOfzdV6lOoKwKlwH8tQNJDWk6YcbfqBBwx4bnHQ1zrUaVZmKaQxgTrK0vWWCiC3ykYMstaOjivdl5n69KmjVHKL8VzztHP8W473578h8V+IM1TzbnL5spRfRo0MBA0IDMC0mTv/AAwDxTieYNRv+bzJWbTVe6+02MfrhTXzymTHPYj6/ecVX2TY6XjxBU1M8xjdVDEHt6ViO2NvE8/UqgNTYkESDHUTBDAEX6YlKFVXYAxcgC3W354f08/SkLN4mP57b2wz2L0FVs/VJhNYGhDJqbOoBc/6S4NjyjG3PeJM5VEs+lL6tGlQ0f4ose2BMp5lculGjUZtMH0yFkEglvhUEXkkDGEBaJVoJAJIVlb8XIgkH64Wg2O/DOY8wt5hVwFEAMoiTIPpXmI374pfLpHemkWsakfpOE/A6GYWn++Sp5XlocutUmFHSBdZBURy+UYYUuIZeWk0RFoaoq+rodYGj2icK3QyViTiHh8nU6PAknTcwOgj4uewxNVm0x6zPMMdJ+hOL8cUoVSy0qTuKXxPTZWUAmQfSGEHTuR1xsznAc1mqKtl8vRekwkPUZCw/wAy2AQ2A298MpsVwOcJmNLgggmR0v0kz9Dttgn/APIKtOV8wACygKrW5RINo6nFB4u8CVMnkzmXqhiNAZAgXSWIBhg14J5LftiGzKQwsDJ6fry3GHtNCU0xn+0w5qlFqBpJDGNLc9o0+/S3XBi1cqwvQIN59Ztv3HL9cAUaqDUG5wwI5TBnrbbG3JKKieayggNpa8bQZMD/AAkCfr3XsPQw8OtSLsUCgAiLjUYF/cRJgW+mMONOajqtoGogCNiT9bqRHvifq1/KOqmagYgQZBtcEGIj+W17NMhX1CdRM6RqO9otPvqv3mcZ1hccjnZWWROHGjrHhPg1CnTpM9J5anLKwCiSdhOmRbY2Nu2IjxPrOZgZZEAJmmr6ge8EKvXkcdQ4AfLprLtamuowWHwixe4A7mJEbY5Zx2tTq8QaWZbqoqKbC8i/KJknlipCTCs3lPXRoUI816evRR0AWmxLdFgm8SW2sMEUvD+elQcvYkAu1RBpHMkK9wB0E9jid/tG4v8A886iprphaakqwIOkbyLETy5fPA3CaFZqbBMzXR1g+WjtA1AEE6WtvB5g/bmtWViy9o+DKw1BqwJiVA5noxKAgG2wMXwJxDgWboIahGWaCBp9UmRf1AC/yPPpjdkq/EchkkZ63nLVqAppPmOJXYM9yCBdSBBHcwi4t4yzNdQlQVqgNwhVdLbrPpuRc/OelkKL7NHE+IhX8tfL1WEFGMzG2kyTfaDvGAc3xCoh9aBd90qLcW+FvV9dsCPxR3A1U2DqdSxMlZsQTcspvvtHQ4Spn2OptUHsxJgm4ki4sN/445pg5FCvF7WAJi/oNp7Cpy69MMKLoVV2rU53NPSwkGwkySNibdMSfD69xoGolZjSCQZiwgRePrje+ZeoRpBBAgRzvYdzJ2/TC/K6DZS1IInVS/7r9/Uwj25Y9iZp8TVRD+YGP4lOmL9Ise87E49hqYdFdlOK6a9SqVkVSuocwFBFu+mBG1sD1s3UrkDzGpUGUL5lQQ76QNyJIBIG0/SYI4b4ey62rZseaxuKZNS55SrC4vtI2vcTSZbK1aCaaHESUU282iQkE7hmRg/qJkoTE8sdxV2FzdcUTnBaCCdAenTpurF6hALMGU7TNwI0gEkav9tRS47kqjv66eggE6xpBI/1gSYC/TlgfNNnG0p5mSqyezXYES0FQrGTaOcXwE9UU20VMplqhBAbyaiqYJ2C02Y/WP4mhbD+I+IsklPyct5b1nqEll2WBuzLcn4vSOe5G+APEOUNPLo+ZdfOYllWACq39TR19Vjt8rfMq+VosGGWqCrBZVcxDElgDzAAAG31N8JfEmWrZtxLjUY8y19UwFUT8ItAtJN9hCtXoNtInRn69erooSdXwqBvG55dJvi5y/CHpUFV2Y1LliPh1ECwMbAACeZk9gPwrh//AA+ndVLvOt9QJ0jYDSSAv3J32GMV4kzuGCkyphR03+ZkDGuONKDce/VnmZ80+SXoM4Lnxk6hqVAdLI1LkQNRUyRMkDTOH/DvFeXNAQWqPUC0/LUHVIV6bSI9IBgljAgTfENxfNebppvTr04M6gu1iOu0HFL4DywrNXpV6lc00pq9J9RUn/GBMjUbA7TF92nOoZHHlOr/AEacOVP47A2yzqRTt5jsirDFtIgEyYHqI1OeiKIBLWHpcRdcvJBJLFmRRcbMo6k6SrR/mHWMWp4V5VZqxUIoQrTUNMKIBJMwWKrTEnnrv6sc4zHiDRXdDRMio4Hq3YkhjyN4+QAHIYFW9Gi6Wx3TzrupbSCBb1ERIgkQRv6gOp0vexx7KVXPlFUP75WKiVB0MoJMxs2qmIvYm1sB5fiIqQq00DMZgtoJmDME33BtsTym52Sq06fmExpB0CCSFIAkg7QWZttgKYMGVAkGIj494bBAbLoTb1IzEt3IBAtMiI6YlK+UgDb646olNWc7yCRq27Hn0viePDlfM69AXyyAFn4ii69bLzBOkb9Z6FoTFlET8K8HZkVqWumoU3JDoShgkSrMl53g2vi3y3hs0l8qF8rXrYCmqs2x0+YlYMEJAOkHl88B0OL1fMViqkSLwf44qvJZij6RI60lY7kiGJBBG+LZVFK4sy4Z5HKppEqnhyohrlKuk11ZXApIARJOlZq2XSdO/S5xrTwpTWg1IAamkeYQJCyYWPOix3aJMDvNKc9VmIeBYfuVAja08vbB2Qy7MA7OyH1WAVWWWvbSYnfvM+0OTNVCPi/ElQn0m7HoMS4oo+bqMROoKYPcKbfxw88Q0WZoEGGacYjJUS6PTMPoUVAzgCyKDEmxkDf6bY05ZvjsyYMMYybiB5akKevyvRqENpkat4Bg3579Tilr+Hqop1KodUpIhFJEkGP+qB6p2EmdzgF+H6WsaZ9nG/Mbz84jDXMcYC0StVwFVRYcp3WBYkbydve+Mtm2MWuyE47lKrqUao+8AOQbkqRcFvTuIF532vIcSpvTOmquk30nrFiQdiJA+fTHR8lxRdZKjTuSC15C+m8kkkJN5IjkGuY/GJmEJ5xM/pi+JX2zNmycXUY2ciBMxHSLxF/44r+BeUtNuWuJQzpBuGi/zjkAMaafh/za1ZSjgLUcpoi41G1wdoH1w1o+Hq6uB5TgCSZUyBvJgdcLJjr7JvP5VQ5YxpN7ExcnrfcRGNvhlB+0IAwVC4+LaJA/PFdxHg+unp/ZiSBAaHkbXgNHyGFvhzg9ehmUNWlVKK0hlQmCDIkG5g8p5YCYJI66udVKFWo5FNZgamFhsPVMX98cn4DU83iOpKgbVUMAyBbowVrQNwIOLd/EL/s7IMrmCTJJ0Nb6DbEl4aytalmfMq5VzTOv1mk20HfVp9ieV94wqA4kX4yNWtncxUMeqoY9Sm3wDnInTzAPWDbDDwpw2rVraqCJUZaZLrUYqrKABLEMDYkbHF3qouq68tTmLzQm+5j53x98JZJMs+acIwSqEFJNMfEzeagm1isxNlI6YrONRsTFk5SqmhZxzjCpoy3lvQamvmMiOWhzDFkJJMWkbEA8iSMKcnlqmapu9EM+m7AFQqMAS3pZ/haNQj4TJ32acd4A+YqvXorUFTVq9QtsFAH+0Dadh1ubms8MgtM01YIxGoAGZJmezTJ2jviMTTJkXxWiSQUnzCwNhbV/iBA0mTaxiTaZkznG8sf74KAT8ajYNPxC+xNiORkG8x0zxfw7LBtRMU64LkANb8TEAH0qZ1bbWsVBxL8SptU1PpDXPmLspmF82VELyDC0jQ2xUKyq7BetCDJ150lWZGFwV3HMR9v622ZTij0KiDzamjdlVjHOCL3Mkn374W1abUKm1jtMwRMSDzHcY35ynESQQ4Lq0QQTYyB+G17c55EYFfKjr0FZ6vl6isZdKoZYJltSwdXq1GTMf1MewttZWBBE8pj+I9vfrPsOlQG77OlftzA01oaKjwAXWhoOphBVSNEtBKyOhJiRO/ivl5PQjA+awZnWjXceUsjSGB1AlhMe2xF8EZbO52ko/ZfNNIl18xF80OR6SV+IjTDQJJNyTsANxBUyRh6Y81xLOZ1KHO5BJ/eMs6mtp1R1lNIYW8Q4yVfy8rUzGpkBNRqy6QrbmVgmDaJEMCNwcbOD5allqSV6tqchqaN/8pBM1DsI6cif8oAJXEuNL5dCklJaiJTChnRdTIo0i2t4W0CTJOo87pvGnFPNQkhRMaUJ9pgA+3sLYR5N8UHjqwTifiAllq0yCNRsbnsCLWgiTzOLHw9QqVKAqsFRnuoAg6YAk3iW5W5k88TPgLw7TqzUzA0IUZqbMDpJU3MkwYhpHT54uM9nkpjUh1U1KprJgM5UsdIJmAB8rYtj4KVMz+Q8ihcCd4pUgAxYmCOvTGFDLmmoLiSDIWb9rxthw2cpAAtTgbyYt3jVJ3IsMTviDixfUKSWgCZJv0sbG4+h+VY5HCNyq/oxSi8sqppHzMcQOYZVWqKcajJmPaNpsY774vfDfk1ctTapTViFA1AxqIEEwoi+n7DHKcmpXVpT1bDVIIDAEkmfl88dD/s2zqPlopqCKdRl1XgiQQYm0hpvjPbd2bUlFaLPiDKaNNl+HbraOp32544XxTOoczWqAgrULlWCyw3CmOU/UzjuGcTVlGVtNjBjaDP6HHCeAcLrlkqfsxdGBKsNXeGhW18rGOhHI4Me2Vb0rKnJ8My9RfOWmQ1OJJOzQQQIB1XF4G2skWON9fL0qSKnn6VcR5cKAdQ5ao69r+5wfxqkaWQc00NOKNhBGmVBcXuWa8k32FonEDkENQkuIIUkEXPIT8XQ9emO7Ov6LrIV0DL5ldPLYOSdMnYj4lYrP4QL8ttxryGZVSzMfUqTHIu5aL9tBH0wKuURKdNVQQFO8i5KGd+s/lyw7zDZYKKZZOWqTpJMG4JNtzYzg44c5aEzZVji7vZM5biDs+nSNBmJmwvGKbMu+hXNN2Cj8Ie1tzF4gxYEjAuYylKNVMamEQJDAzaLCdj1wwyXE6iBdWXiIkl9PzgkHftjTLDytMxryeNSjv8AnQn4WaT1lapSVDZVYnUY1GfSACLk3MbnBlPMghl81wTMHlpJB0kWtt95mbfONNSZlI104ZHDEsVYSpawILRcX5jnBxu4Jw0EGm0615q5AI5xe478x7Yz48ab4vs2Zc8ow5R6FzcUVnJAJlrSBNzab+2GD8NotpcGmSwEwskiLgkn1D2I+YsQavBaishUMbiZeeY9sL+E16oUDYAnnO9+fc41fji5VIwS8ifDnj/tDPNZEUYenqcFhqLEQLMBOom0mB30zhRnKYqKVZ3Un1WqfCbwL6vSbggzy2icOaGZY6g4DLAEMRBJOkTJ6n2GMRl6SqjHQUaSG8tDNtr2HtaCDjPlw/N8DTh8j/jTyvfQo4dQVS+l6tRhF2IMA6IEjoNjyk7ThxlKBuSRA5Ha/Xrfl+eAOJ8RyyErQZGM+qKYVW7ggC0+4xPZzinqLAgNAFiZtttGBiaXY2eL/wCpU8SyzJVbVUnUS4uDvMfEoIMzeI36zjT5831yQN9QE/Ig3A+vLpgpEqOylgVBRE8z0kiXFxLE8x+HlMiL/eIcAqqqqi6vUCxZhMReQDe4EWMX62i1baj6ZSGVRxqUqQJUz5KiGEzIIK3ssTKXEiOR620kK6ldXGok72llneGPwX9yfrsTf+AVkAikpW8iBAuI3gkHr1JmLSFmMlWprpSh8J/DAB/0wwiSNyOYPLEpT4Pi9P8AbGjOM1a2fUpSbHn2O/L1DmYsBy2GDchmHIEkaVVjpjaRpkA7XIO/02AnDFqksamVdUAMt8RFmNoJANhE/wDt7kVoBIhQuoyajQSRAuAVFoFjONGGE8nVEs3kQxLaBlaxFv5/rg/hPCnq1Q0U2pqFgMASDEki+0z0uD0xhm81lwCC1P8A2reetrH2Jv23Ap4lUpVmWm06SFkCx7RabknGjJjaaTIYcylFyj/ZXcRzvlSCAsjoII62Mn74hvEGZFQ6j5bK20ekqOXvixooa5KVyY9BESCDuRfbpPQnbEz4z8L6KLNQBYCPRJne572/KYGIuDVmmGVOr0xLV4qQKcMummAFBO0E2kQSOxPzwIc0zf8AyA2iD/Im/thLww021LWLIAR8KljuB8OofnOGn/Dck1KaVTXUBPpZShIGxChySY6Exz04m4/ssmfM6grKVq1NRCgU5c+mNgC1lETbCHOcMqIZDK6j4SDdl6jkYupjmDE74rOEcFypKq7KzMCxVabMVgsIF5kxMGI7g4Ifg+W3KhYYLoNJpi0mR0k2IvcSMGOjnsS8E8M/tAUvWRbbOwkAEwDYnkd+UY9hxT4HlGZgX8tRz8s+q/8AmKgcjc/cY9g7OSRTf8tlKdQZSuvnOYJeoNKAG9oKlmMrLHbY3gouL8aKVdPl5apXKFnqIv8Ads021yQ7adyBYmAbThVkeFVa5avXdgikTcwNiFFxL222UAEzZcffIp0y5SQpJYajJA6E84mO8Cd8SnLiFbNOYzGhCzQIva0zsN98IKKVc1VAgm8Doo6dtsfeI51q9QLTkgkBRtqJMD9BfFh4T4c6hoZVpU/jqAKwd4kAahIBEEmdhaNQAOOHCN+xW+Uj1HImjpRiVUAsqhiQJ1SPV/i1E2sN+2As9Wq1kcq6qtKfTqAJm8LLAmwUWnGNbiVTOZtyX8tI1XcDTAGsBjEEtJv/AAwXkDSpemmy1DD7wypJUB9d9ROowBsY9sdvtj2qpCbL5hlQu9RiTspLETa8T7j5Y+5esolnN51Dex/CN7k3Nto+WN44NVq6hTTUUAmCCRJt6bWiTzjqcdE8DcAy75SkxquutmFmW5VypMMv5EiI6DBfyIpWyF4XxFNZpk6qlVgSTp00xaJM7rck9wBfe7zr0uHq1VnYq6KFpiNTMtqlVjvZdC7xOkCLTT1PC1CmY85zYGSEaZJjdflA6dcJ+P8Ah5TRr6ahceU2lWY3IIIBUKBGqxOo7xFzhqoaiT4p/aO1am9HKZZ2NSVlpBBaACIJA23JHtjZmc9WSoQAsKYAgWAsNo5Rhf4U4eyJUqBPNYkD0kLpEAsIZgIMwNjDMOeHHEA+v4CpIBIIJglVMSCRz3/PFMc6/wARMuNSpSRszGfevQrUnWFNNwdJ0zKMN2BjbEbwvgqirFIuS406WhhMgi4jpFxi34KR5kG0gc55wbQOXfBNfhjgqyqzuI0j0ggncQam+Dk5OmJi4Y7XQn4ezvpSmVD6C15stgduZMAdN/wnGzjnBnNQsukgk31Dv123xlTz1KgXWj+9j0NU1G7JvG9vUb/mAMblpmuNUAmQwBYCAQepHQYrhxR437M/kZ5rJxVUAeH6Gh4qECdIiZk3/wAPe+C6HFFemJViSL7ATzj/ANY20qDUSx0HYbHcHofphRkWPli2NGOVdGPNBz20b6lRq1MoVh6bArebGR2BklRsfiNsbvCucLt5bMQ6EQeegmPeUPpPYoMFcGpSWaJ9BkdpE/yxF8R4lWymcWpYmm4JAAGsW1C/J1vB2McxjPmi1PmbfFmpY3i+i0yHFAWBi0iSxLEfSBA9uuE3DQ+kmOf6DD7gq0mgLBVwGRgIkESv/UOR543UOEIovMd2j8v1xTHFyfIzZ5LH8GD8BUmqJA2NjcbHGCcDp0g3q0gEcupAEmbwTE+x54a5KtSVwBGx2H64w4qDVDIqbi8neLj7wI6dwMPPj2yWPnLUbSMmyp1GCdPIHfAubyHmGIUbeoxYe0ycYcLy1XSBUewFoO/STvb7481dkrVTIgkQO4UCft9sTjwhGvQXHLKXJvaGlYBHUq6kqFMDcQBJ+3y39lHC+JkLpYao+E/ocJuKcQdnJ3J5/blj3D65IaR05++MWHHxyOUHSbNGb5Y6mii/4kzMFAAkgdd7e32xlUybQZAA7kCPqZwjo1pdYmx1f9ILfpigymdDoS8KQIYEiPcX2/LB8jw455LnJ6+ieOc8MbhH+Sf4+5RAoPxTII7rHzlD98LsoC6zAmb2+WDfFdRXZSjKQehnaSfuxwNkQyqI7Yr4mOWOChL0UyzUvkvYRklPmKCsgMPoLn7Ye1EfSai0yDeBuZ5bd+eFXDKLOzkG4p1NI7kFRt/q+2N3CsvVogLV+DkTPp+22K5IKckm2hIqUY8oJN/Qxp+KIEVaZFQABthf+r4+1+KWUlGiBBEe/wAsZPlKLXdFJgerr02Bm32jGOadAvpg9iW2/wCjDtOHsXHKGT0/7J/iDUVcV6SMtckJIIG8sTH+yDG8mZwS2dpZhdNcAxBKteDyKncHuLjGviGVDaChEQxiZ9RgRMDbSY/1YIPCgtAMQSzRJ/wj+GJRm069GvJhUo3btdENx3JjLuho1CUYnSGEFdIFjsCINjA27SVtfLrVMhmVjupP5T+Xt86nP8LZsxTZ0LUFVbf4jdj/AOWm/wDhxpzXhjXBpkJCywYHrAH0xBtXo1wulZK8PKU60VbLpMl11X7CDH/vHsWHEvD+ikukaivTe+/T+vYY9hWmysZUtGaZnNVV1ZitrJA0oABF+ggT1tvEzbEz4iz9/KBvHrjl/lnaY36TG84O43x1qa+Wh9ZAH+kRaOrdPkemBfCXAhmKoDmAQSfhOlQLu8uIUWPP7Xjig23Of+jptaURp4a8NswVCh8ypJ5SFAnmuoQASQN9rzGNvjDjVE0qeSygDU0MmoDOprTcQGk3LRG0WGGniDjfk5QUstWqNSEqzFDBLEkgMbrqRiNINhfe+EPAKYXXVq0ahZ40hdKwPmpI6AW74t+2LrpDfhGRy60AbtoXVVAVdLEAlhq1zcAwdImDthHSzBAHlBSYkgWPQi/uMOvE+ZVCKKf3SKCx2NVjJuReFBC+49sJwy6ZjSgURYEXnr3j3xOTtAb3QRlM3WVRGsu0SFDfCeRAudhvzi2MctTzOunSVXp09QBZlAjURqb1Df25jvig/syylPM1MwaxI8sUmJDAGCHEjUCLGDMj4h0GOlZfgmRWn5gkkCDNWColeaEREDbl2OGhDicYVOM0Fp0xqphlSCpklQLDblfGl+JUmVlFSiSUnSG9R2b4TcTAFxgqpkMuwhaKmY9XmFj1NqgI2jkd/nicznC1TN61WB5a7jnAAmIGw5DDNs5JHzK8ORFhZE3N5+xt0wn4txNRVNMqzH03BEmVHKAOYG/TFDUqovxmJsNzJM9L7A4VZyhRVjWVh5gWwMxbaxEyP9Q2GKYofVGfyMu+O/8ARtoU1RviM3FwAPqCTv2wXmM8aiBqSgyRc2j/AKgDa525Ynlzj1GKnRG8rPL3JxQqkeo2QlT9SVAjtM/TGyXGOl0edDnNty3JdACcAy9OnTpIxKooW0eq5JJBi7MSTHXBIy+ggLYDmBBNrX9sCVeIoOpPtH54X5rLvXh0bQQSu5vEEG3+oj6YafCC0iWP82SXydD6nRd0qKzA2lCQQZmQCZMiYvE74T5HgulYaoP9oJH3g/bBdHLsqMTUZiFa5PQSMas7nKmohVFxIgTv74WHBtsrl/LxStMJ4G603ZSSW0sCAIi45nvhL424X+06TTTS4BXfcC42FiCTbnJxQcLo6gtQmWZYvA2gG3O6z+mC+I0HNJ9OnWbAsCQCLg2vNot0GFzXwsfxZR/NRAeBM2SGy72amdSdYn1r/tb1D3fpi84etNqzI9LU0a1ZmsRYER1DdjuMcw4hRqUsz5wfS9nlVjcCZBt8iLjeQcCUPF+dpVjU87U4VlGoDSurdgogBoggx7zjPyfHR6DgnO2d2SjpFlVAbehY3tuIk+2BfJpZcjzWAJMBiRbmBAt2Hy63kP7OfETZyk+WzJZqiSyNJkrMgzPxKYg8vTzxWVODhwHrPJURPlrsOZJ1W59u+E2VpfR8p1qdQFaRQ6TY7xO4I39jz+WJPM0qhqVixAJc8iTAJ7jth8/F1CKjuFUFlLUyuloE25aSL2BItsbFS9es9dv3BFMkRV0ELMAfihTJnlM9sLP4q2rEaUkJ83lYIJk8un5YN4blDpMId/4czhrmctVpQWiCJ0gwI52FhuL9xgmgoZSAdmIPUEHDeLk/I2qpr7MvlNY42+hFlSVrKGUfinqPSR+uD3ogmImRy5jGzMUaaNqbTq2kn9P5YIyNVajBVmN+g+/P5Y2OHttGWGf1CLZI57hrM4WmC0Cbd9vywzGTIEAGY+hxZLkwtQMoCyL23if/AHgPjPDWqEkVGFogbT7DfEYvfZfLjlSolsrR8sPqbyyYgkjkZmJ7D3wfT4mPL1Ms8mAFj3vEA79saj4c0Uy1SqqsD8PxHtttOC6NVEgFC8GDNgR15kiOoGKvKlpE4+M27l36/QCazUCwF0mVBk6Sd1t8/p74Y5VNdMOyknckiB23jljRxepVqKdOlCZ+ETPT4p27YjMoKrnRWqMxFhqJiJsOgP8ALpaayUqKy8S5XdfwWuUqUDU0nypEwF9Rk8vSJmLxiqyjo6rBkkSAAZ7/AE745plqYRgQYI5+3X+OKjhfEzyMHmOuEnNs0YsMYKgniWTlyRYGfT157bfTAdakkSN7R3/jgupWkySSDynbtbGvNUw4AJNtj0xlb2aaF9SsYgjSTJJItP8AU49hsaIIAa4649h1IHE4pwPgdfNNqVWZdUO/Qm/uT2UEi1uvTOE579jotrzYlF00qTOSBBAJCMAbfCBogE7EiMTvDkqcPp0qhr6Feo0K0qpaANTKGlgI/CQTC9pQ+Js15+Y/c+oSdDguZW2mSSSLRI5GRjm7YVpDXjnFa2cqqrMag1K3qgBQsmwQDcTfcSRPMU6cWoilUqDLmk16QRmZ9UzcDSDKkC/OSOsTPh3gR1BWLIblqhMCACbgz0j3wXxfM0mkSAqQqzyURokzPv1P0xObSDtE7msw1SqARYmIj+pxv4hU0iDBC3PKWM2jpyt0wzr0KKUVNIP58BWvKgNMuJlulrWLCMIfEDAsQjEosKCbajF2jkTvHfBhTeuiVNdmjhvEXptUZWglCPqyj8jbFT4frV9LswqDUR6iCIgekgm255YoP7N+AedlEqhkpCXBbSZJDvzEB/SBYkwANsXo8G0aYDuzubA6dKz03k/92Kt/oatCnKccVcuhrKxcJ6gabhuk6gImBO974XZ7i61c5SppqEI5Ya+YLCIA9Qvz2IGKt8hQPpFGT1Zizjfk89Pwmb8sSnGsqaWZR0CaTpQyTr3Em8ncmZM9zhXYVRlmSA5JAMRvNoB6EdT9TgekRUJBBAgzBt9IneBvgjMrLkASenyx9yeVIY2iYUCfrblcDfHneJLLLyeKbrlv67M/kyjDHJvutA9DhagqRuTafY4I4r6UKf4VvHYg/mDg0UvUu403AI3j/wBR88LM02rX3V//ABIGPR/+lnUOMY+2jL4cJcXKQH5p6/W+DMhUMEBVPqFtIMyOnywuZoE43cLqeZ5iXIYCQOx/ScUeKeWLUXRKOb8bt7C89n9FJvSt1cAaR0udu4thRRzTEA3mBebbYa8Z4cSFLm0n/uF5/wBwO3bAWXyhNMKFO3SMP4kJxhU9sp5LWn67MuGUgoR5kqZF+5/T88V0hgCPhYYnsvkyFGw3/PDvho/dkTsbYvBSd2qRmnkh8XB7RJeJuBNVqly6rKxECAVAGw3G1+pGOdcZ4bUV2DJpIICmfiHy747PxjU9KoKLDWV02g9CBPIkArPLHN/E1Wq9OkGQBlh1m2rr2vH3GMrTi+J7EZKcVMQ8Ez1ShVR0bSw2I6XHSLXBHQjpjsfCMrQzSo9RsxWkaodm0K2xHpAUEGbG8X2xx/IZmmgKVaWpAZkrcAz+IDUDEj3kXxZ/2X8e/fjLSSKsldRiSoJDWtOlSCBzHQYCb9hR0zK8NpUvgp007hQD9dzbBDEDc3/rr+mPlZkS7uqe5A/P+GF68cQAijTarpjUwKIonbU7sv6m2Fc16HSDczQ8xCuk35xt3vH9TiGp5NzVqqX06WIaAb3P9fPD7NeJCPirUKfamGrtHv6KY+pxO5rxxSVj5OWaq3N6h5/6UAj21YMJU7aJ5cfKNIOo8HXeGf32+2N2Y4olI+WtO9pMhV7Eve0zcAxfphMnHM9XBBZaKtYrTAUx/qEtt1ONlHJ6E8skmmGYqWuUm8ExdSd+hvttR5b6JQ8eMexpX41VdREINtpKkb72+2FFbiFSo0FmIEal9rgiLcgfvjY+UcCYtJEHnG9u3t07YHGXYPANvwt+h/rv1wllmjdVqvqO7AmdJ5gbR0Pb+WN2YqkooT4pt27H+v55UMmeYIjcGxHcT7/0MGJlwCZu0chZh/HBAKcvmGYQ4gCdt1PXCypQmoYMzz/xfwP9dzSVio9IG91Y/lP9fngPMZMEm1ibxaDe/wB8dRwqNMQL9p/MEYyo5mBz25/hPLvGDK3C2XlJ5gcx1HfAnlA2HtP6HHHBdDix2Iv+fv1/rbDzI5kVBcaT0P6dsQ9Sx9vt/LDXgxqu6rpYgiZAJtJEgD4ryIvzi+FlFDRkViqD8LD6yPtj2AKuWq0FV6qFA5IAO87kxuB8hvj2J0Us5b4u48c24VVQU0LeWFBmJMaidyBzHIjeJxu4RworDC9rj84/ngLhmT8pwzgF2mFkWA33ttPPFBXraFEhltPqUrY7WN8LKXpBjH2wpM7UKaQ3L4SAI6naemFH7IGYOw/ETaYMHYgi3K82/Jjl1DQxKqxIHqO97DuZO2BswpKsIglrc46c5698Sk6pL2FpPs18LraqplSSwCgyBuJP4TueYIi2J7NfEdRvJNtr7/W2KLIZVlFMs+kqGcDTebwCYEAggyZ+E7bFHxdlNQlecT2P4gfnI+mNMNaIroqvBHiKpSy9XLKxA1GqPn5asJ6WmP8AMTiz4V4kqU1rh/WSE0hySFjUTbpMWERFuWOS+HszozVKZKsShAMTqUqLkED1EGe2Kjjub0h0+FgFHpMmJUm5ABtIsLzyw7W7O5LjQ8fxqaUs1VWEEaCS6x/l0nUlh/GcKW8ZtmcwkwB6dJO8gzE8wZi98Sb5cCiSAJ1AE84i0dL9N+c2wuR4Py/njns5No7k2bCuVJgMwHzIEbdgcfTmVUzt3ax+XT88C6Q9USszDLabgGPsT9RgHMZFi7iIGphJ9zing5Fwa+m//TzPN8flk5L2NqOcDLUKmdIM/O//ANT9cJM9nHXUukgXGrm3KQeQPQfU4YZDIQlRQ12UXjof54NoOEkRLbknvfblvhZ445M9yXS0VSlDBFR+ydVGamCTpBAgc2+XTDfw7ldDkkEAqbn3GNFXMkEgQvsP13++MMkxNUEybHvyxrilFaMrTl+h/nQHUqpBaLD8v+4D6nE3k+KOaa+glgIPyttvfD2km7ctMT8xjIURyIE3iOZ32Eb98TWTjNl5eOsmKOroT+ZmHEaQv2/O+DMjRZVIdtRJncn88MBR7H52+388edlUSWVR/X4m2+uFedDQ8Nr0kaaCQGPIlf8A7ThR4p4f5yFgBqVfTAjbfbckfeME5nxLlEP955jdFlz9rffG7LZr9ro6qA0QV306iDBELe7Db3GM8pW7N8IcY8Tk+fyWtriSNiOh/r88UGUy6UglWgAvpJVhdgSCHGr4voRI9yMVnFODZWgFanlTmSxa9SWAPSB72XSJBmcTZV1qFHTQtUk0/RoAe50gHYMOXKL8sB5It8fZyi0af2piW9TuwI2sCCCQdXMWiZ3tjWH0sZgSDqUS7aRB1DoRvblaYJx9zFpMEmCLmBuCRv1APy7YzoVaiPFOFe8aFJJMEG46gkT3OBSGtjLhFVSPLaJBkc57j5XBG4w4OSEaoxMLTYepS3pJ0s0SwFzblEyJ3GscgMVXC82KlLobyMEFmrKUfVYT7Yb0MsSZMAf10wioORUjkLqZvPTFNk6oYT9cA411cswa4JEkz87gxzG46i3LA3lqNUEEHeCPkbcrf1OHr0NaEFSVPP8AIgnmDGE9ekVLI0al+KNjOzfPn0M4azgEvDGIJG46jGZO0fI/ocaqWXZoIidRC3n/ANjv2vhzkOBVng6CFbebR3vvhrFJ3NG9xPUdO4wZRGpgOZ279sVNPwmiw9aoBF7bR0k/wxuovkqNqaFyD0m/W9vmBgWcoiLJ8PqVLKjRMTG38sfcn4FfVrqOqCSSN5HLpHe/8cUn/Farj92gUdd/5YAz3CqlddNRiRM8zB6RIEYDY3EWjLcMoEGWzDiR6Lgzv6hC9oLHnjOl4pBUpl6K5cRZgAfaQAAP+7CPPUGy1QZesBoeWpOORm4733B5xfbAw16tKI9SpH4FmRy5GAetvlgBMOK8Tq1qn7+qwZQYBC6eVlAHMXm+3fHsYZvQV/5g0qQBMDVrcX5BQRHue45g+x1HEHlsyW0kAaizLbT8LXBB3DNpiFvBOGGYySvTGoMp1N6ps0BCAPYSbRvfrgTLUV84+kWZYsLekY306rAWYidIMHcErIPUTiOOmqHemHZRkpoSsGLwb+obdseqMlUoNOovMAmP8Q5HkZHcg9RjWB6Knz/8RjdnHIpUYJECvEcvTS2wJQtX9Buj5xDLKcor0lCurNSaDcyobmZO3/cRiPkQQVknn0OHfDazecy6jpYGRNj+7BuOd74TZv4jiuPumSbBLggjcEEfLFFxXitOo+qTJUSNNiYuJ+3TCEfD9cey92Wb+oYshGrDOIvpLAGB0UyOwnewJGFyoTeMbswZW/K3ykWxjSO+OSOboseHeOnpqqtRDBRAIcgwNpJDSQLSd8H/AP54jsD5DCYmXFth0v1xz+rh3wSgrCnKqbDcA8sMlXQkvktnROE8XD1NGgLKEg6p7gbDcX3w2KBokgf17d4+WI3hP99l/Zv/AOo/IAe2LE4Rzd2OsUXHj6NRytOZ06j3t9r/AJ42gxZQB7D8pk4zUbfP8sJKrnQ1z/cZNv8AdruffvgOcn2wrFCPSG4zQiSdUKzdbL8cdY6YzbNGdKkA61TVyGtdVNrRKkwOWBaY/fxy/a80I7GmJHscBuf3H/8Akpn5irAPyGBQ1kZX8WZyozIx8sqSGCADSRYgkybNbfC3P+bV+J2J2ksWubqJmBJEXP5YY+LaY/4jmLDeqdueiZ95JM9cA/EDN7c77EAfbHAAMk5ZDczcHqcV3hHiqUq5RVNJG0hV1ajNgpLN1PPlOJtlAr5kAAAVWAAsANTQBjEn1p88AKOkeIFNCoy1R5lCv8adI3KmB61kEE7DSNpwJxXgMZXzNatrqBadQD8IBcNG+uQAQdtJGxOH3iwTkUJuf3d/k2FTGcrmF/CuYXSOS+hhYcrWtjNJ1L+xn2Ic3TJubt+IgwJjf2YfW+Aizqsg6AAQNySbCAesH6e+N6sfNzAkx5VIx31C/vgnhoHmD5/+Bxp72Ij2VoiBOpnmQxIFxtAj9Dy6Ya8AyzNVVUWNRgjkpgk/QSfa284W5oxUIFh6rD3w1oHSrabekbW5r/E/U44JQHh2UpS9etDXOkbjlHM/lj2W8S5RX05ekGaN23+8k/UYi6l2WbyW3x8zQh9IssbcvphuIvLZb1/EjuG9cAb6REfrhX+0o7h3bSdi+4YHpf1Tb64W1XPluZM2v9MJsoxJJJJMc8KMdQy/iPLUv7uiB3G+25MSRgtuMVXFmABuCo5e+Of03MLc8sPeFMfLa+zH/wAVP5kn544KG9c6vjafnjHh+bpq+kwQTAPTtB54AzZ9A91/MThXTvHdFPzjf3xyC9I6DmM3RpXd1HSTJ+mJ7iHjpFEU6RZu5gR+Z+2Juhs2Aa/xYfjRNStWFeIOK/tTBqhAWnsOXcxvibr8VqrTNJKh0dNvy7c8fMyd/njTxFAHcAACFt8lxwbADTdhC3v8PvJJv7b+2PmC+LnTw9WX0sWgsLGNXUX6Y9jkA//Z" alt="" uk-cover>

                  <div class="uk-text-center uk-overlay uk-overlay-primary uk-transition-slide-top-small ">
                    <h3 class="uk-margin-remove uk-position-center">Visie Beurs</h3>
                  </div>
                </div>
              </router-link>
            </div>

          </div>
          <div class="uk-grid-margin">
            <div class="uk-cover-container uk-light">
              <router-link
                  :to="{name: 'explore', params: { subroute: 'bekijken', searchtype: 'element', query: 'Kop van het kanaal'}}">
                <div class="uk-cover-container uk-light uk-inline-clip uk-transition-toggle ">
                  <canvas width="400" height="150"></canvas>
                  <img src="https://images2.persgroep.net/rcs/6YEw1q3f6WKSrmi9-GQvLW-biI8/diocontent/70927513/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.9"
                     alt="" uk-cover>

                  <div class="uk-text-center uk-overlay uk-overlay-primary uk-transition-slide-top-small ">
                    <h3 class="uk-margin-remove uk-position-center">Kop van het kanaal</h3>
                  </div>
                </div>
              </router-link>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="uk-section uk-section-small">
      <div class="uk-container uk-container-small">
        <h4 class="uk-heading-line"><span>Populaire projecten and initiatieven</span></h4>

        <div class="uk-child-width-1-2@m uk-grid" uk-grid="">
          <div class="uk-first-column">
            <router-link
                :to="{name: 'explore', params: {
                  subroute: 'bekijken', searchtype: 'element', query: 'Campina terrein - De Zuivelfabriek'}
                }">
              <div class="uk-cover-container uk-light uk-inline-clip uk-transition-toggle ">
                <canvas width="400" height="150"></canvas>
                <img src="https://www.zuivelfabriekeindhoven.nl/media/131560/nieuwbouw-eindhoven-campina-collage-pleinview-2.jpg"
                   alt="" uk-cover>

                <div class="uk-text-center uk-overlay uk-overlay-primary uk-transition-slide-top-small ">
                  <h3 class="uk-margin-remove uk-position-center">Campinaterrein Eindhoven</h3>
                </div>
              </div>
            </router-link>
          </div>
          <div>
            <div class="uk-cover-container uk-light">
              <router-link :to="{name: 'explore', params: { subroute: 'bekijken', searchtype: 'element', query: 'Mariënhage'}}">
                <div class="uk-cover-container uk-light uk-inline-clip uk-transition-toggle ">
                  <canvas width="400" height="150"></canvas>
                  <img src="https://www.dela.nl/-/media/images/headers/marienhage_header2.jpg?la=nl-nl&hash=4ED3FBA66BBD308F2E43451E281FB2771571CBC6"
                     alt="" uk-cover>

                  <div class="uk-text-center uk-overlay uk-overlay-primary uk-transition-slide-top-small ">
                    <h3 class="uk-margin-remove uk-position-center">Mariënhage</h3>
                  </div>
                </div>
              </router-link>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import UIkit from 'uikit';
  export default {
    data () {
      return {}
    },
    mounted() {

    }
  }
</script>

