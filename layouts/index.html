{{ define "main" }}
<main class="main list" role="main">
	{{- with .Content }}
	<div class="content main__content clearfix">
		{{ . }}
	</div>
	{{- end }}
	{{ $paginator := .Paginate (where .Site.RegularPages "Type" "in" .Site.Params.mainSections) }}
	{{- range $paginator.Pages }}
		{{- .Render "summary" }}
	{{- end }}
	{{- if and (eq $paginator.TotalNumberOfElements 0) (not $.Content) }}
		<div class="warning">
			{{ partial "svg/files.svg" (dict "class" "warning__icon") }}
			<h3 class="warning__headline">{{ T "noposts_warning_title" | safeHTML }}</h3>
			<div class="warning__text">
				<p class="warning__description">{{ T "noposts_warning_description" | safeHTML }}</p>
				<p class="warning__tip">{{ T "noposts_warning_tip" | safeHTML }}</p>
			</div>
		</div>
	{{ end }}
</main>
{{ partial "pagination.html" . }}
{{ end }}