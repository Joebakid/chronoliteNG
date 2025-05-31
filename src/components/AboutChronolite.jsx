import React from "react";

function AboutUs() {
  return (
    <section className="min-h-screen text-white px-6 py-20 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold uppercase text-green-400 mb-6">
          À propos de Chronolite NG
        </h1>
        <p className="text-lg leading-relaxed mb-6">
          At <span className="font-semibold text-green-300">Chronolite NG</span>
          , we are committed to delivering elegant, affordable, and timeless
          accessories that elevate your style. From luxurious watches to trendy
          bags and fashion wear, our mission is to make quality fashion
          accessible to everyone.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Born out of a passion for design and craftsmanship, Chronolite NG
          bridges the gap between modern fashion and classic appeal. We curate
          pieces that speak to your identity and empower confidence every time
          you step out.
        </p>
        <p className="text-lg leading-relaxed">
          Whether you're dressing for a meeting, a date, or just expressing
          yourself—Chronolite NG is here to help you do it in style.
        </p>
      </div>

      {/* Future Vision Section */}
      <div className="max-w-3xl mx-auto mt-20 text-center">
        <h2 className="text-3xl font-semibold text-green-400 mb-4">
          Collaboration & Future Vision
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          At <span className="text-green-300 font-medium">Chronolite NG</span>,
          we believe in growth through meaningful partnerships. We're open to
          collaborating with suppliers, retailers, and factories to bring even
          more style to our customers.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Our dream is to evolve from a curated fashion brand into a global
          name, including launching our own exclusive line of watches.
        </p>
        <p className="text-lg leading-relaxed">
          If you're a watch factory—especially in China—and interested in
          partnering with us to produce high-quality timepieces with our
          branding, we'd love to hear from you. Let’s build something timeless
          together.
        </p>
      </div>
    </section>
  );
}

export default AboutUs;
