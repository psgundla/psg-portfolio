export default function PerspectiveHelixGallery({ items }) {
  return (
    <div
      className="helix-frame"
      role="group"
      aria-label="Personal photographs shown in a scroll-controlled horizontal reel"
    >
      <div className="helix-stage">
        {items.map((item, index) => {
          const [image, title, alt, href] = item;
          const Card = href ? 'a' : 'figure';

          return (
            <Card
              className={`helix-card${href ? ' helix-card--link' : ''}`}
              key={`${title}-${index}`}
              href={href}
              aria-label={href ? `Open ${title} project` : undefined}
            >
              <img
                src={image}
                alt={alt}
                draggable="false"
                loading={index > 2 ? 'lazy' : 'eager'}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
