---
layout: page
title: Blogs
permalink: /blogs/
---

Occasional notes on compilers, MLIR, and tooling.

{% if site.posts.size > 0 %}
<ul class="post-list">
  {% for post in site.posts %}
  <li>
    <span class="post-meta">{{ post.date | date: site.minima.date_format | default: "%b %-d, %Y" }}</span>
    <h3><a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h3>
    {% if post.excerpt %}<p>{{ post.excerpt | strip_html | truncate: 200 }}</p>{% endif %}
  </li>
  {% endfor %}
</ul>
{% else %}
<p>No posts yet — this is where they'll show up.</p>
{% endif %}
